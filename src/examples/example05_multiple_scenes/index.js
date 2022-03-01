import * as ABIThree from "../../Copper3D/main";
import data from "./dicom.json";
import monkey from "../assets/modules/monkey.glb";
import "./mystyle.css";

const container = document.querySelector("#container_root");
const numberOfScene = 3;
const allScenes = new ABIThree.Scenes(container, numberOfScene);
let dicom_file_paths = [];
for (let item of data) {
  dicom_file_paths.push(require("../assets/images/dicom1/" + item));
}

const scene1 = allScenes.getScene(0);
const scene2 = allScenes.getScene(1);
const scene3 = allScenes.getScene(2);

const gui3 = scene3.gui;
scene3.camera.position.set(0, 0, 500);
scene3.camera.far = 1000;

let imageLoader = new ABIThree.ImageLoader(
  "Image",
  dicom_file_paths,
  scene3,
  gui3,
  this
);
imageLoader.viewImage();
imageLoader.setImagePosition({ x: 0, y: 0, z: 0 }, (stackHelper) => {
  console.log("hello: ", stackHelper);
});

if (scene3) {
  ABIThree.createTestMesh(scene1);
}
ABIThree.loadGLTFFile(monkey, scene2.scene, scene2.camera, null);

const gui2 = scene2.gui;
const gui1 = scene1.gui;

// const zz = gui3.addFolder("zz");
// zz.add({ Slider: 0 }, "Slider", 0, 1).disable().enable();

const color = gui2.addFolder("color");
const colorString = (str) => color.addColor({ x: str }, "x").name(`"${str}"`);

a = 1;
colorString("#aa00Ff");
colorString("rgb(170, 0, 255)");

addCameraGui(gui1, scene1.camera);
addCameraGui(gui2, scene2.camera);
addCameraGui(gui3, scene3.camera);

// a = 1;
gui1.add({ controlAll: false }, "controlAll").onChange((flag) => {
  if (flag) {
    controlAllCamera();
  } else {
    stopControl();
  }
});
let nIntervId;
const controlAllCamera = () => {
  nIntervId = window.setInterval(() => {
    scene3.camera.position.x = scene1.camera.position.x;
    scene3.camera.position.y = scene1.camera.position.y;
    scene3.camera.position.z = scene1.camera.position.z;
  }, 300);
};

const stopControl = () => {
  clearInterval(nIntervId);
};

allScenes.animate();

function addCameraGui(gui, camera) {
  gui.add({ cameraOpen: false }, "cameraOpen").onChange((v) => {
    if (v) {
      let camerafolder = gui.addFolder("camera");
      camerafolder
        .add(new ABIThree.CameraHelper(camera.position, "x"), "value")
        .name("x");
      camerafolder
        .add(new ABIThree.CameraHelper(camera.position, "y"), "value")
        .name("y");
      camerafolder
        .add(new ABIThree.CameraHelper(camera.position, "z"), "value")
        .name("z");
    } else {
      for (let item of gui.foldersRecursive()) {
        if (item._title === "camera") {
          item.destroy();
        }
      }
    }
  });
}
