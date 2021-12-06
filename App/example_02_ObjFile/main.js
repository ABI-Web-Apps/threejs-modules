import { initThreeD, loadObjFile } from "../../ABI_ThreeModule/index.js";

let canvas = document.getElementById("bg");
let { scene, camera } = initThreeD(canvas);

loadObjFile("../../public/modules/monkey.obj", scene, camera);
