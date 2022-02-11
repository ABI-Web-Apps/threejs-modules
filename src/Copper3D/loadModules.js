import * as THREE from "three";
// import * as three from "three-v79"
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader.js";
import { MTLLoader } from "three/examples/jsm/loaders/MTLLoader.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

/**
 * @module LoadModules
 *
 */

/**
 *
 * inner function just for deal with loading
 */
function loadingBar(xhr, progressBar) {
  if (xhr.total !== 0) {
    const percentComplete = (xhr.loaded / xhr.total) * 100;
    progressBar.value = percentComplete;
    progressBar.style.display = "none";
  } else {
    progressBar.style.display = "none";
  }
}

/**
 * This function will return a default material for obj module
 * @returns {object} - threejs material
 */
function getMaterial() {
  return new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe: true });
}

/**
 * This function is for load .obj file
 * @param {string} url - the .obj file url
 * @param {object} scene - the current domElement's scene
 * @param {object} camera - the current scene's camera
 * @param {object} [material] - the material for .obj file (optional), the default material is THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe: true })
 * @param {HTMLElement} [progressBar] - the progress html domelment bar for loading.(optional)
 * @example
 * const container = document.getElementById("container_root");
 * const progressBar = document.getElementById("progressBar");
 * const allScenes = new ABIThree.Scenes(container);
 * const scene = allScenes.getScene();
 * ABIThree.loadObjFile(monkey_g, scene.scene, scene.camera, progressBar);
 *
 *
 */
function loadObjFile(url, scene, camera, material = null, progressBar = null) {
  const objLoader = new OBJLoader();
  !!material & objLoader.setMaterials(material);

  objLoader.load(
    url,
    (object) => {
      if (!!material === false) {
        object.traverse(function (child) {
          if (child.isMesh) {
            child.material = getMaterial();
          }
        });
      }
      camera.position.z = object.position.z + 10;
      scene.add(object);
    },
    (xhr) => {
      if (progressBar) {
        loadingBar(xhr, progressBar);
      }
    },
    (error) => {
      console.error(error);
    }
  );
}

/**
 * This function is for loading .mtl module. 
 * .mtl module is .obj file with material
 * @param {string} url_mtl - .mtl file url
 * @param {string} url_obj - .obj file url
 * @param {object} scene - the current domElement's scene
 * @param {object} camera  - the current scene's camera
 * @param {object} [progressBar] - the progress html domelment bar for loading.(optional)
 * @example
 * const container = document.getElementById("container_root");
 * const progressBar = document.getElementById("progressBar");
 * const allScenes = new ABIThree.Scenes(container);
 * const scene1 = allScenes.getScene();
 * ABIThree.loadMTLFile(
    monkey_m,
    monkey_g,
    scene1.scene,
    scene1.camera,
    progressBar
  );
 *
 *
 */
function loadMTLFile(url_mtl, url_obj, scene, camera, progressBar = null) {
  const mtlLoader = new MTLLoader();

  mtlLoader.load(url_mtl, (material) => {
    material.preload();
    loadObjFile(url_obj, scene, camera, material, progressBar);
  });
}

/**
 * This function is for loading .gltf module
 * @param {*} url - .gltf file url
 * @param {*} scene - the current domElement's scene
 * @param {*} camera - the current scene's camera
 * @param {*} [progressBar] - the progress html domelment bar for loading.(optional)
 *
 * @example
 * const container = document.getElementById("container_root");
 * const progressBar = document.getElementById("progressBar");
 * const allScenes = new ABIThree.Scenes(container, 1);
 * const scene1 = allScenes.getScene();
 * ABIThree.loadGLTFFile(monkey, scene1.scene, scene1.camera, progressBar);
 *
 *
 */
function loadGLTFFile(url, scene, camera, callback, progressBar = null) {
  const gltfLoader = new GLTFLoader();

  gltfLoader.load(
    url,
    (gltf) => {
      camera.position.z = gltf.scene.position.z + 10;
      scene.add(gltf.scene);
      !!(typeof callback === "function") && callback.call(this, gltf.scenes);
    },
    (xhr) => {
      if (progressBar) {
        loadingBar(xhr, progressBar);
      }
    },
    (error) => {
      console.error(error);
    }
  );
}

/**
 *
 * @param {number} r - Radius
 * @param {string} color - e.g., 0xffffff
 * @returns {object} - A Circle mesh
 */
function createCircle(r, color) {
  const geometry = new THREE.CircleGeometry(r * 1.6, 30);
  const material = new THREE.MeshBasicMaterial({
    color: color,
    transparent: true,
    side: THREE.DoubleSide,
  });
  return new THREE.Mesh(geometry, material);
}

/**
 *
 * @param {string} color  - e.g., 0xffffff
 * @returns {object} - A ring circle mesh
 */
function createRingCircle(color) {
  const geometry = new THREE.RingGeometry(10, 9, 30);
  const material = new THREE.MeshBasicMaterial({
    color: color,
    transparent: true,
    side: THREE.DoubleSide,
  });
  return new THREE.Mesh(geometry, material);
}

/**
 *
 * @param {number} [width] - Default value 250px
 * @param {number} [height] - Default value 180px
 * @param {string} [backgroundColor] - Default "rgba(255,255,255,0.1)"
 * @returns {HTMLElement} - A div for right panel
 */
function createPanel(width, height, backgroundColor) {
  const div = document.createElement("div");

  div.style.width = typeof width === "number" ? width + "px" : "250px";
  div.style.minHeight = typeof height === "number" ? height + "px" : "180px";
  div.style.backgroundColor =
    typeof backgroundColor === "string"
      ? backgroundColor
      : "rgba(255,255,255,0.1)";
  div.style.padding = "5px";
  div.style.margin = "2px";
  div.style.color = "#fff";
  div.style.position = "absolute";
  div.style.right = "0px";
  div.style.top = "0px";
  div.style.borderRadius = "5px";
  return div;
}

export {
  loadObjFile,
  loadMTLFile,
  loadGLTFFile,
  createCircle,
  createRingCircle,
  createPanel,
};
