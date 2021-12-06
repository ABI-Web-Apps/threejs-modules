import { initThreeD, loadMTLFile } from "../../ABI_ThreeModule/index.js";

let canvas = document.getElementById("bg");
let progressBar = document.getElementById("progressBar");
let { scene, camera } = initThreeD(canvas);

loadMTLFile(
  "../../public/modules/monkey_m.mtl",
  "../../public/modules/monkey_g.obj",
  scene,
  camera,
  progressBar
);
