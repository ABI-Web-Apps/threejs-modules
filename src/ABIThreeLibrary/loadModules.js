import * as THREE from "three";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader.js";
import { MTLLoader } from "three/examples/jsm/loaders/MTLLoader.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

function loadingBar(xhr, progressBar) {
  if (xhr.total !== 0) {
    const percentComplete = (xhr.loaded / xhr.total) * 100;
    progressBar.value = percentComplete;
    progressBar.style.display = "none";
  } else {
    progressBar.style.display = "none";
  }
}

function getMaterial() {
  return new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe: true });
}

function loadObjFile(url, scene, camera, progressBar, material = null) {
  const objLoader = new OBJLoader();
  !!material & objLoader.setMaterials(material);
  objLoader.load(
    url,
    (object) => {
      if (!!material === false) {
        object.traverse(function (child) {
          if (child.isMesh) {
            child.material = getMaterial(child);
          }
        });
      }
      camera.position.z = object.position.z + 10;
      scene.add(object);
    },
    (xhr) => {
      //   console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
      loadingBar(xhr, progressBar);
    },
    (error) => {
      console.error(error);
    }
  );
}

function loadMTLFile(url_mtl, url_obj, scene, camera, progressBar) {
  const mtlLoader = new MTLLoader();
  mtlLoader.load(url_mtl, (material) => {
    material.preload();
    loadObjFile(url_obj, scene, camera, progressBar, material);
  });
}

// load Gltf file
function loadGLTFFile(url, scene, camera, progressBar) {
  const gltfLoader = new GLTFLoader();
  gltfLoader.load(
    url,
    (gltf) => {
      camera.position.z = gltf.scene.position.z + 10;

      scene.add(gltf.scene);
    },
    (xhr) => {
      // console.log((xhr.loaded / contentLength) * 100 + "% loaded");
      loadingBar(xhr, progressBar);
    },
    (error) => {
      console.error(error);
    }
  );
}

export { loadObjFile, loadMTLFile, loadGLTFFile };
