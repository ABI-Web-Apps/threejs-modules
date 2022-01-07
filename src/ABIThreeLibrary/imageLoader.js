import * as THREE from "three";
import { stackHelperFactory, VolumeLoader } from "ami.js";

class ImageLoader {
  constructor(
    label,
    dicom_file_paths,
    callbackFunction,
    scene,
    canmera,
    gui,
    container
  ) {
    this.label = label;
    // this.dicom_file_paths = dicom_file_paths;
    this.callbackFunction = callbackFunction;
    this.render = null;
    this.scene = scene;
    this.newIndex = -1;
    this.image = null;
    this.path = dicom_file_paths;
    this.camera = canmera;
    this.gui = gui;
    this.container = container;
  }

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
    // return this.stackHelper;
  }

  setRenderFunction(render) {
    this.render = render;
  }
  //   setCameraFunction(camera) {
  //     this.camera = camera;
  //   }
  viewImage() {
    this.imageLoader(this.path).then(() => {
      this.addGUI(this.stackHelper);
      this.scene.add(this.stackHelper);
    });
  }

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

    // const zz = this.gui.addFolder("zz");
    // zz.add({ Slider: 0 }, "Slider", 0, 1).disable().enable();
    // const color = this.gui.addFolder("color");
    // const colorString = (str) =>
    //   color.addColor({ x: str }, "x").name(`"${str}"`);

    // colorString("#aa00Ff");
    // colorString("aa00Ff");
    // colorString("0xaa00Ff");
    // colorString("#a0f");
    // colorString("a0f");
    // colorString("rgb(170, 0, 255)");
  }
}

export default ImageLoader;
