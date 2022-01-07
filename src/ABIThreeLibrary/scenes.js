import * as THREE from "three";
import { createLight } from "./base";
import { GUI } from "lil-gui";
import { TrackballControls } from "three/examples/jsm/controls/TrackballControls";

export default class Scenes {
  constructor(container, numberOfScene, cameraPosition) {
    this.numberOfScene = numberOfScene > 0 ? numberOfScene : 1;
    this.container = container;
    this.cameraPosition = cameraPosition || { x: 0, y: 0, z: 500 };
    this.elems = [];
    this.scenes = [];
    this.cameras = [];
    this.sceneInfos = [];
    // this.gui = new GUI();
    this.init();
    this.animate();
  }

  init() {
    this.renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
    });
    this.canvas = this.renderer.domElement;
    this.canvas.className = "c";
    this.container.className = "container_root";
    this.container.appendChild(this.canvas);
    for (let i = 0; i < this.numberOfScene; i++) {
      const elem = document.createElement("div");
      elem.className = "abithree_scene_div";
      this.container.appendChild(elem);

      this.elems.push(elem);
      const gui = new GUI({ container: elem });
      gui.domElement.classList.add("force-touch-styles");

      const sceneInfo = this.makeScene(elem, this.cameraPosition);
      //   scene id
      sceneInfo.id = i;
      sceneInfo.elem = elem;
      sceneInfo.gui = gui;
      this.scenes.push(sceneInfo.scene);
      this.cameras.push(sceneInfo.camera);
      this.sceneInfos.push(sceneInfo);
    }
  }

  makeScene(elem, cameraPosition) {
    const scene = new THREE.Scene();

    const fov = 75;
    const aspect = elem.clientWidth / elem.clientHeight;
    const near = 0.1;
    const far = 1000;

    const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);

    camera.position.set(cameraPosition.x, cameraPosition.y, cameraPosition.z);
    camera.lookAt(scene.position);
    scene.add(camera);
    const controls = new TrackballControls(camera, elem);
    controls.enabled = false;
    // light
    {
      const color = 0xffffff;
      const intensity = 1;
      const light = createLight(color, intensity);
      scene.add(light.pointLight);

      const cameraLight = new THREE.DirectionalLight(color, intensity);
      cameraLight.position.set(-1, 2, 4);
      camera.add(cameraLight);
    }
    scene.background = new THREE.Color("black");

    return { scene, camera, controls };
  }
  /**
   * Get the scene infomation with the corresponding id by entering the  parameter ID.
   * @param {Number} id
   * @returns {Scenes} - If found the id of the scence
   */
  getScene(id = 0) {
    const scene = this.sceneInfos.find((element) => element.id === id);
    if (scene) {
      return scene;
    } else {
      console.log("Oops...No scenes have been found!");
    }
  }

  renderSceneInfo = (sceneInfo) => {
    const { scene, camera, controls, elem } = sceneInfo;

    // get the viewpoint relative position of this element
    const { left, right, top, bottom, width, height } =
      elem.getBoundingClientRect();
    const isOffscreen =
      bottom < 0 ||
      top > this.renderer.domElement.clientHeight ||
      right < 0 ||
      left > this.renderer.domElement.clientWidth;
    if (isOffscreen) {
      return;
    }
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    controls.handleResize();
    controls.update();

    const positiveYUpBottom = this.renderer.domElement.clientHeight - bottom;
    this.renderer.setScissor(left, positiveYUpBottom, width, height);
    this.renderer.setViewport(left, positiveYUpBottom, width, height);
    this.renderer.render(scene, camera);
  };
  resizeRendererToDisplaySize = () => {
    const width = this.renderer.domElement.clientWidth;
    const height = this.renderer.domElement.clientHeight;
    const needResize =
      this.renderer.domElement.width !== width ||
      this.renderer.domElement.height !== height;
    if (needResize) {
      // to create a grid for multiple scenes
      this.elems.map((elem, index) => {
        if (index === this.numberOfScene - 1 && this.numberOfScene % 2 !== 0) {
          elem.style.width = this.container.clientWidth + "px";
        } else {
          elem.style.width = this.container.clientWidth / 2 - 2 + "px";
        }
        elem.style.height =
          this.container.clientHeight / Math.ceil(this.numberOfScene / 2) +
          "px";
      });
      this.renderer.setSize(width, height, false);
    }
  };
  animate = (time) => {
    time *= 0.001;
    const clearColor = new THREE.Color("#000");
    this.renderer.setScissorTest(false);
    this.renderer.setClearColor(clearColor, 0);
    this.renderer.clear(true, true);
    this.renderer.setScissorTest(true);
    this.resizeRendererToDisplaySize();

    // for (let info of this.sceneInfos) {
    // }
    this.sceneInfos.forEach((info) => {
      this.renderSceneInfo(info);
    });
    const infos = this.sceneInfos;
    var el = window.document.body; //set default value is body
    window.document.body.onmouseover = function (event) {
      el = event.target.className; //when mouse over which element then get the element classname
      if (el === "abithree_scene_div") {
        infos.forEach((info) => {
          info.controls.enabled = true;
          info.controls.update();
        });
      } else {
        infos.forEach((info) => {
          info.controls.enabled = false;
          info.controls.update();
        });
      }
    };

    const transform = `translateY(${window.scrollY}px)`;
    this.renderer.domElement.style.transform = transform;

    window.requestAnimationFrame(this.animate);
  };
}
