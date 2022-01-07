import * as ABIThree from "../../ABIThreeLibrary/main";
import "../assets/css/style.css";
import monkey_g from "../assets/modules/monkey_g.obj";
import monkey_m from "../assets/modules/monkey_m.mtl";

let container = document.getElementById("container_root");
let progressBar = document.getElementById("progressBar");
let allScenes = new ABIThree.Scenes(container);

const scene1 = allScenes.getScene();

ABIThree.loadMTLFile(
  monkey_m,
  monkey_g,
  scene1.scene,
  scene1.camera,
  progressBar
);
