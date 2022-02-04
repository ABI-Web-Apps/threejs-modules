import * as ABIThree from "../../ABIThreeLibrary/main";
import data from "./dicom.json";
import dots from "./dots.json";
import monkey from "../assets/modules/monkey.glb";
import "./mystyle.css";

const container = document.querySelector("#container_root");
const numberOfScene = 1;
const Scene = new ABIThree.Scenes(container, numberOfScene);
let dicom_file_paths = [];
for (let item of data) {
  dicom_file_paths.push(require("../assets/images/dicom1/" + item));
}

const scene1 = Scene.getScene(0);

const div = ABIThree.createPanel(280, 200, "rgba(164,241,255,0.3)");
scene1.elem.appendChild(div);

const gui = scene1.gui;

const screenPosCallback = (pos) => {
  div.innerHTML = "";
  pos.forEach((mesh) => {
    div.innerHTML +=
      "G circle pos->: {  x:  " +
      Math.round(mesh.position.x) +
      "   y:   " +
      Math.round(mesh.position.y) +
      "   z:   " +
      Math.round(mesh.position.z) +
      `  }<br />`;
  });
};

let imageLoader = new ABIThree.ImageLoader(
  "Image",
  dicom_file_paths,
  scene1,
  gui,
  screenPosCallback
);
imageLoader.viewImage(dots);
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

const getMesh = (mesh) => {
  console.log(mesh);
  mesh[0].scale.set(50, 50, 50);
  mesh[0].position.set(-200, -50, 0);
  scene1.camera.position.set(0, 0, 500);
  scene1.camera.far = 1000;
};

ABIThree.loadGLTFFile(monkey, scene1.scene, scene1.camera, getMesh);

Scene.animate();
