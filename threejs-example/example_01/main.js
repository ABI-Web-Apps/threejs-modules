import "./style.css";

import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

// get a scene
const scene = new THREE.Scene();
//
// get a camera
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.01,
  1000
);
// get a renderer to render the canvas
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector("#bg"),
});

// set the renderer pixel
renderer.setPixelRatio(window.devicePixelRatio);
// set the render size
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);

// then add object
// the {x,y,z} points that makeup a shape
const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
// add color so use material -> the wrapping papper for an object

// const material = new THREE.MeshBasicMaterial({
//   color: 0xff6347,
//   wireframe: true,
// }); //this one does't need light

// this material needs light
const material = new THREE.MeshStandardMaterial({ color: 0xff6347 });

// add object and material into a mesh
const torus = new THREE.Mesh(geometry, material);

// the let mesh be added into scene
scene.add(torus);

// so add a light here
const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(5, 5, 5);

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight);

// add light helper here
const lightHelper = new THREE.PointLightHelper(pointLight);
const gridHelper = new THREE.GridHelper(200, 50);
scene.add(lightHelper, gridHelper);

const controls = new OrbitControls(camera, renderer.domElement);

function addStar() {
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial({ color: "#ffffffff" });
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(100));
  star.position.set(x, y, z);
  scene.add(star);
}
Array(200).fill().forEach(addStar);

const spaceTexture = new THREE.TextureLoader().load("/assets/img/space.jpg");
scene.background = spaceTexture;

renderer.render(scene, camera);

// Avatar
const pikachu = new THREE.TextureLoader().load("/assets/img/icon/Pikachu.png");
const pik = new THREE.Mesh(
  new THREE.BoxGeometry(3, 3, 3),
  new THREE.MeshBasicMaterial({ map: pikachu })
);
// pik.position.set(12, 10, 0);

scene.add(pik);
// Moon
const moonTexture = new THREE.TextureLoader().load("/assets/img/moon.jpg");
const normalTexture = new THREE.TextureLoader().load("/assets/img/normal.jpg");

const moon = new THREE.Mesh(
  new THREE.SphereGeometry(3, 32, 32),
  new THREE.MeshStandardMaterial({
    map: moonTexture,
    normalMap: normalTexture,
  })
);

// moon.position.set(20, 20, 20);
moon.position.z = 20;
moon.position.setX(-5);

scene.add(moon);

// function moveCamera() {
//   const t = document.body.getBoundingClientRect().top;
//   moon.rotation.x += 0.05;
//   moon.rotation.y += 0.075;
//   moon.rotation.z += 0.05;

//   pik.rotation.y += 0.01;
//   pik.rotation.z += 0.01;

//   camera.position.z = t * -0.01;
//   camera.position.x = t * -0.0002;
//   camera.position.y = t * -0.0002;
// }
// document.body.onscroll = moveCamera;

function animate() {
  requestAnimationFrame(animate);
  torus.rotation.x += 0.01;
  torus.rotation.y += 0.005;
  torus.rotation.z += 0.01;

  moon.rotation.y += 0.01;

  controls.update();
  renderer.render(scene, camera);
}

animate();
