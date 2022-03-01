import * as ABIThree from "../../Copper3D/main";
import data from "./dicom.json";
import monkey from "../assets/modules/monkey.glb";
import "./mystyle.css";

const container = document.querySelector("#container_root");
const numberOfScene = 2;
const Scene = new ABIThree.Scenes(container, numberOfScene);
let dicom_file_paths = [];
for (let item of data) {
  dicom_file_paths.push(require("../assets/images/dicom1/" + item));
}

const scene1 = Scene.getScene(0);
const scene2 = Scene.getScene(1);

const gui = scene2.gui;
scene2.camera.position.set(0, 0, 500);
scene2.camera.far = 1000;

const screenPosCallback = (pos) => {
  console.log(pos);
};

let imageLoader = new ABIThree.ImageLoader(
  "Image",
  dicom_file_paths,
  scene2,
  gui,
  screenPosCallback
);
imageLoader.viewImage();
imageLoader.setImagePosition({ x: 0, y: 0, z: 0 }, (stackHelper) => {
  console.log("hello: ", stackHelper);
});

gui.add({ cameraOpen: false }, "cameraOpen").onChange((v) => {
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

ABIThree.loadGLTFFile(monkey, scene1.scene, scene1.camera);

const gui1 = scene1.gui;

Scene.animate();
