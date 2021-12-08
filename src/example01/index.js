import * as ABIThree from "../ABIThreeLibrary/main";
import "../assets/css/style.css";
import monkey_g from "../assets/modules/monkey_g.obj";
// import { Something } from "./assets/modules/model.js";
// import "./assets/modules/testglb.js";

let canvas = document.getElementById("bg");
let progressBar = document.getElementById("progressBar");
let { scene, camera } = ABIThree.initThreeD(canvas);

ABIThree.loadObjFile(monkey_g, scene, camera, progressBar);
