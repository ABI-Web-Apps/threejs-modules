import * as ABIThree from "../../ABIThreeLibrary/main";
import "../assets/css/style.css";
import data from "./dicom.json";
// import { readFileList } from "../ABIThreeLibrary/utils/readFiles";

let container = document.getElementById("container_root");
let allScenes = new ABIThree.Scenes(container, 1);

const scene1 = allScenes.getScene();

// console.log(z);
let dicom_file_paths = [];
for (let item of data) {
  dicom_file_paths.push(require("../assets/images/dicom1/" + item));
}

let imageLoader = new ABIThree.ImageLoader(
  "Image",
  dicom_file_paths,
  scene1.scene,
  scene1.camera,
  scene1.elem,
  scene1.gui,
  this
);

imageLoader.viewImage();

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
