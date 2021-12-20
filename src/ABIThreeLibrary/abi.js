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
  }
}
