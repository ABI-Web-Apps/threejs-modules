import * as ABIThree from "../../ABIThreeLibrary/main";
import "../assets/css/style.css";
import monkey from "../assets/modules/monkey.glb";
// import { Something } from "./assets/modules/model.js";
// import "./assets/modules/testglb.js";

let container = document.getElementById("container_root");
let progressBar = document.getElementById("progressBar");
let allScenes = new ABIThree.Scenes(container, 1);

const scene1 = allScenes.getScene();

ABIThree.loadGLTFFile(monkey, scene1.scene, scene1.camera, progressBar);
