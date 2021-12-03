// import * as THREE from "../three/build/three.module.js";
import * as THREE from "https://threejs.org/build/three.module.js";
import "https://cdnjs.cloudflare.com/ajax/libs/ami.js/0.32.0/ami.min.js";
// import "https://unpkg.com/ami.js@next/build/ami.min.js";

function createCamera(type, aspect, fov = 75, near = 1, far = 1000, s = 100) {
  let camera = null;
  if (type) {
    camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
  } else {
    camera = new THREE.OrthographicCamera(
      -s * aspect,
      s * aspect,
      s,
      -s,
      near,
      far
    );
  }
  camera.position.set(0, 0, 500);
  return camera;
}

function createLight(color, intensity) {
  const pointLight = new THREE.PointLight(color, intensity);
  const ambientLight = new THREE.AmbientLight(color, intensity);
  pointLight.position.set(400, 200, 300);
  return { pointLight, ambientLight };
}

function loadImage(imageUrl, container, scene) {
  const loader = new AMI.VolumeLoader(container);
  loader
    .load(imageUrl)
    .then((data) => {
      const series = data[0].mergeSeries(data);
      const stack = series[0].stack[0];
      loader.free();
      const stackHelper = new AMI.StackHelper(stack);
      scene.add(stackHelper);
    })
    .catch((err) => console.error(err));
}

export { createCamera, createLight, loadImage };
