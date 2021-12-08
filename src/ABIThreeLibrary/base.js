import * as THREE from "three";

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

export { createCamera, createLight };
