import { initThreeD, loadGLTFFile } from "../../ABI_ThreeModule/index.js";

let canvas = document.getElementById("bg");
let progressBar = document.getElementById("progressBar");
let { scene, camera } = initThreeD(canvas);

loadGLTFFile("../../public/modules/monkey.glb", scene, camera, progressBar);
