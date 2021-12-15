import * as THREE from "three";
import Stats from "three/examples/jsm/libs/stats.module.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GUI } from "lil-gui";
import { createCamera, createLight } from "./base.js";
import { buildGUI } from "./gui.js";
import ImageLoader from "./imageLoader.js";
import { loadObjFile, loadMTLFile, loadGLTFFile } from "./loadModules";

function initThreeD(canvas) {
  // let canvas = document.createElement("canvas");
  const renderer = new THREE.WebGLRenderer({
    antialias: true, //enable antialias
    canvas,
  });
  // container.appendChild(renderer.domElement);

  // Get scene
  let scene = new THREE.Scene();
  // light
  const { pointLight, ambientLight } = createLight(0xffffff, 1);
  scene.add(pointLight);
  scene.add(ambientLight);
  scene.background = new THREE.Color("black");

  // get camera
  const aspect = canvas.clientWidth / canvas.clientHeight;
  // let camera = createCamera(true, aspect);
  let camera = createCamera(true, aspect);
  // camera.lookAt(scene.position);

  const gui = new GUI();
  const controler_flag = {
    cameraOpen: false,
  };
  const controlers = {
    pointLight,
    ambientLight,
    camera,
    scene,
    renderer,
  };
  buildGUI(gui, controlers, controler_flag);

  function resizeRenderTodsiplaySize(renderer) {
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
    if (resizeRenderTodsiplaySize(renderer)) {
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

  return { gui, scene, camera };
}

export { initThreeD, loadObjFile, loadMTLFile, loadGLTFFile, ImageLoader };
