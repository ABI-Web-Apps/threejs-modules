import * as ABIThree from "../../ABIThreeLibrary/main";
import "../assets/css/style.css";
import monkey from "../assets/modules/monkey.glb";
// import { Something } from "./assets/modules/model.js";
// import "./assets/modules/testglb.js";

let canvas = document.getElementById("bg");
let progressBar = document.getElementById("progressBar");
let { scene, camera } = ABIThree.initThreeD(canvas);

ABIThree.loadGLTFFile(monkey, scene, camera, progressBar);
