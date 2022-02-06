import * as ABIThree from "../../Copper3D/main";
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

const gui = scene1.gui;
const controler_flag = {
  cameraOpen: false,
};

gui.add(controler_flag, "cameraOpen").onChange((v) => {
  if (v) {
    let camerafolder = gui.addFolder("camera");
    camerafolder
      .add(new ABIThree.CameraHelper(scene1.camera.position, "x"), "value")
      .name("x");
    camerafolder
      .add(new ABIThree.CameraHelper(scene1.camera.position, "y"), "value")
      .name("y");
    camerafolder
      .add(new ABIThree.CameraHelper(scene1.camera.position, "z"), "value")
      .name("z");
  } else {
    for (let item of gui.foldersRecursive()) {
      if (item._title === "camera") {
        item.destroy();
      }
    }
  }
});

gui
  .addColor(new ABIThree.ColorGUIHelper(scene1.scene, "background"), "value")
  .name("background_color");

allScenes.animate();
