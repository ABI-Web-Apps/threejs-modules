import * as THREE from "three";
import { TrackballControls } from "three/examples/jsm/controls/TrackballControls";

export default function makeScene(elem, cameraPosition = { x: 0, y: 0, z: 5 }) {
  const scene = new THREE.Scene();

  const fov = 75;
  const aspect = elem.clientWidth / elem.clientHeight;
  const near = 0.1;
  const far = 500;

  const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);

  camera.position.set(cameraPosition.x, cameraPosition.y, cameraPosition.z);
  camera.lookAt(scene.position);
  scene.add(camera);
  const controls = new TrackballControls(camera, elem);
  // light
  {
    const color = 0xffffff;
    const intensity = 1;
    const light = new THREE.DirectionalLight(color, intensity);
    light.position.set(-1, 2, 4);
    camera.add(light);
  }
  scene.background = new THREE.Color("black");
  return { scene, camera, controls };
}
