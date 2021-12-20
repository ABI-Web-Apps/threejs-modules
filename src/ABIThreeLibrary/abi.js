import * as THREE from "three";
import { GUI } from "lil-gui";
import { createCamera, createLight, createTestMesh } from "./base";
import ImageLoader from "./imageLoader";
import makeScene from "./multipleScenes";
import "./css/style.css";

class ABIThree {
  constructor(container, sceneNum, cameraPosition) {
    this.sceneNum = sceneNum || 1;
    this.container = container;
    this.cameraPosition = cameraPosition || { x: 0, y: 0, z: 5 };
    this.elems = [];
    this.scenes = [];
    this.cameras = [];
    this.sceneInfos = [];
    this.gui = new GUI();
    this.init();
  }

  init() {
    this.renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
    });
    this.canvas = this.renderer.domElement;
    this.canvas.className = "c";
    this.container.appendChild(this.canvas);
    for (let i = 0; i < this.sceneNum; i++) {
      const elem = document.createElement("div");
      this.container.appendChild(elem);
      this.elems.push(elem);
      const sceneInfo = makeScene(elem, this.cameraPosition);

      sceneInfo.elem = elem;
      this.scenes.push(sceneInfo.scene);
      this.cameras.push(sceneInfo.camera);
      this.sceneInfos.push(sceneInfo);
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
  }
  resizeRendererToDisplaySize = () => {
    const width = this.renderer.domElement.clientWidth;
    const height = this.renderer.domElement.clientHeight;
    const needResize =
      this.renderer.domElement.width !== width ||
      this.renderer.domElement.height !== height;
    if (needResize) {
      // to create a grid for multiple scenes
      this.elems.map((elem, index) => {
        if (index === this.sceneNum - 1 && this.sceneNum % 2 !== 0) {
          elem.style.width = this.container.clientWidth + "px";
        } else {
          elem.style.width = this.container.clientWidth / 2 - 2 + "px";
        }
        elem.style.height =
          this.container.clientHeight / Math.ceil(this.sceneNum / 2) + "px";
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
    this.setScissorTest(true);
    this.resizeRendererToDisplaySize();

    for (let info of this.sceneInfos) {
      this.renderSceneInfo(info);
    }

    const transform = `translateY(${window.scrollY}px)`;
    this.renderer.domElement.style.transform = transform;

    window.requestAnimationFrame(this.animate);
  };
}

export { ABIThree, ImageLoader, createTestMesh };
