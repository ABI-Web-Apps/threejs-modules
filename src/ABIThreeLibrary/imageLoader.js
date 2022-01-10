import * as THREE from "three";
import { stackHelperFactory, VolumeLoader } from "ami.js";

/**
 * @module ImageLoader
 */

/**
 * This class is for loading dicom images with using ami.js.
 * @example
 * const container = document.querySelector("#container_root");
 * const allScenes = new ABIThree.Scenes(container, 3);
 * const scene3 = allScenes.getScene(2);
 * const imageLoader = new ABIThree.ImageLoader(
        "Image",
        dicom_file_paths,
        scene3.scene,
        scene3.camera,
        scene3.elem,
        gui,
        callback,
      );
 * imageLoader.viewImage();
 */

class ImageLoader {
  constructor(
    label,
    dicom_file_paths,
    scene,
    camera,
    container,
    gui,
    callbackFunction
  ) {
    /**
     * the image label
     * @type {string}
     */
    this.label = label;

    /**
     * The dicom image paths
     * @type {Array<string>}
     */
    this.path = dicom_file_paths;
    /**
     * Current domElemet scene
     * @type {object}
     */
    this.scene = scene;
    /**
     * Current scene camera
     * @type {object}
     */
    this.camera = camera;
    /**
     * Current domElemet gui
     * @type {object}
     */
    this.gui = gui;
    /**
     * Current domElemet
     * @type {HTMLElement}
     */
    this.container = container;
    /**
     * Callback function
     * @type {Function}
     */
    this.callbackFunction = callbackFunction;

    this.newIndex = -1;
    this.image = null;
    this.render = null;
  }

  /**
   * loading dicom images by using ami.js
   * @param {Array<string>} paths
   */
  async imageLoader(paths) {
    // Add participant's image.
    // Instantiate the loader that loads and parses the dicom image.

    const loader = new VolumeLoader(this.container);
    // load sequence for all files
    await loader
      .load(paths)
      .then(() => {
        let series = loader.data[0].mergeSeries(loader.data)[0];

        this.stack = series.stack[0];
        for (let frameIdx in this.stack._frame) {
          this.stack._frame[frameIdx]._imageOrientation[0] = 1;
          this.stack._frame[frameIdx]._imageOrientation[1] = 0;
          this.stack._frame[frameIdx]._imageOrientation[2] = 0;
          this.stack._frame[frameIdx]._imageOrientation[3] = 0;
          this.stack._frame[frameIdx]._imageOrientation[4] = 1;
          this.stack._frame[frameIdx]._imageOrientation[5] = 0;
        }

        this.StackHelper = stackHelperFactory(THREE);
        this.stackHelper = new this.StackHelper(this.stack);

        this.stackHelper.bbox.color = 0xf9f9f9;
        this.stackHelper.border.color = 0xf9f9f9;
        // Label mesh for use in subsequent ray interests for identifying
        // this image during gui interactions.
        this.stackHelper.slice.mesh.name = this.label;
        // this.stackHelper.slice.mesh.position.set(0, 0, 0);
        console.log("stackHelper", this.stackHelper.position);
        console.log("mesh", this.stackHelper.slice.mesh.position);

        this.camera.lookAt(this.stackHelper.position);
        loader.free();
        // this.stackHelper.index = 2;
      })
      .catch(function (error) {
        window.console.log("oops... something went wrong...");
        window.console.log(error);
      });
  }

  /**
   * set current render
   * @param {object} render
   */
  setRenderFunction(render) {
    this.render = render;
  }
  //   setCameraFunction(camera) {
  //     this.camera = camera;
  //   }

  /**
   * after load dicom image, then call this function to display.
   *
   */
  viewImage() {
    this.imageLoader(this.path).then(() => {
      this.addGUI(this.stackHelper);
      this.scene.add(this.stackHelper);
    });
  }

  /**
   * add dicom image gui
   * @param {object} stackHelper
   */
  addGUI(stackHelper) {
    const stack = stackHelper.stack;
    console.log(this.gui);
    const stackFolder = this.gui.addFolder("Stack");
    // index range depends on stackHelper orientation.

    stackFolder
      .add(stackHelper, "index", 0, stack.dimensionsIJK.z - 1)
      .step(1)
      .name("ImageLayer");

    stackFolder.open();
  }
}

export default ImageLoader;
