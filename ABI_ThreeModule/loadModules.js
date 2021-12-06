import * as THREE from "../three/build/three.module.js";
import { OBJLoader } from "../three/examples/jsm/loaders/OBJLoader.js";

function getMaterial(obj) {
  return new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe: true });
}

function loadObjFile(url, scene, camera, progressBar) {
  const objLoader = new OBJLoader();
  objLoader.load(
    url,
    (object) => {
      object.traverse(function (child) {
        if (child.isMesh) {
          child.material = getMaterial(child);
        }
      });
      camera.position.z = object.position.z + 10;
      scene.add(object);
    },
    (xhr) => {
      console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
      const percentComplete = (xhr.loaded / xhr.total) * 100;
      progressBar.value = percentComplete;
      progressBar.style.display = "none";
    },
    (error) => {
      console.error(error);
    }
  );
}

export { loadObjFile };
