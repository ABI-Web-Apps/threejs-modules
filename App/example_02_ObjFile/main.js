import { initThreeD, loadObjFile } from "../../ABI_ThreeModule/index.js";

let canvas = document.getElementById("bg");
let progressBar = document.getElementById("progressBar");
let { scene, camera } = initThreeD(canvas);

loadObjFile("../../public/modules/monkey_g.obj", scene, camera, progressBar);
