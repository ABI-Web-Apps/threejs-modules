import * as THREE from "../three/build/three.module.js";

// import { OrbitControls } from "../three/examples/jsm/controls/OrbitControls.js";
// import { GUI } from "../three/examples/jsm/libs/dat.gui.module.js";
// import * as THREE from "https://threejs.org/build/three.module.js";
import Stats from "../three/examples/jsm/libs/stats.module.js";
// import "https://cdnjs.cloudflare.com/ajax/libs/three.js/110/three.js";
import { OrbitControls } from "https://threejs.org/examples/jsm/controls/OrbitControls.js";
import { GUI } from "https://threejs.org/examples/jsm/libs/lil-gui.module.min.js";

import { createCamera, createLight, loadImage } from "./basefn.js";
import { buildGUI } from "./gui.js";
import { loadObjFile, loadMTLFile } from "./loadModules.js";

function initThreeD(canvas) {
  // Get scene
  let scene = new THREE.Scene();

  const renderer = new THREE.WebGLRenderer({
    antialias: true, //enable antialias
    canvas,
  });

  // light
  const { pointLight, ambientLight } = createLight(0xffffff, 1);
  scene.add(pointLight);
  scene.add(ambientLight);
  scene.background = new THREE.Color("black");

  // get camera
  const aspect = window.innerWidth / window.innerHeight;
  let camera = createCamera(true, aspect);
  camera.lookAt(scene.position);

  const gui = new GUI();
  const controler_flag = {
    cameraOpen: false,
  };
  const controlers = {
    pointLight,
    ambientLight,
    camera,
    scene,
  };
  buildGUI(gui, controlers, controler_flag);

  function resizeRenderTosiplaySize(renderer) {
    const canvas = renderer.domElement;
    const pixelRatio = window.devicePixelRatio;
    const width = (canvas.clientWidth * pixelRatio) | 0;
    const height = (canvas.clientHeight * pixelRatio) | 0;

    const needResize = canvas.width !== width || canvas.height !== height;
    if (needResize) {
      renderer.setSize(width, height, false);
    }
    return needResize;
  }

  const stats = Stats();
  document.body.appendChild(stats.dom);

  function render() {
    if (resizeRenderTosiplaySize(renderer)) {
      const canvas = renderer.domElement;
      camera.aspect = canvas.width / canvas.height;
      camera.updateProjectionMatrix();
    }

    renderer.render(scene, camera);
    // rotation
    requestAnimationFrame(render);
    stats.update();
  }

  render();

  // control
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.target.set(0, 0, 0);
  controls.update();

  return { scene, camera };
}

export { initThreeD, loadImage, loadObjFile, loadMTLFile };
