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

const gui = scene3.gui;
scene3.camera.position.set(0, 0, 500);
scene3.camera.far = 1000;

let imageLoader = new ABIThree.ImageLoader(
  "Image",
  dicom_file_paths,
  scene3,
  gui,
  this
);
imageLoader.viewImage();
imageLoader.setImagePosition({ x: 0, y: 0, z: 0 }, (stackHelper) => {
  console.log("hello: ", stackHelper);
});

gui.add({ cameraOpen: false }, "cameraOpen").onChange((v) => {
  if (v) {
    let camerafolder = gui.addFolder("camera");
    camerafolder
      .add(new ABIThree.CameraHelper(scene3.camera.position, "x"), "value")
      .name("x");
    camerafolder
      .add(new ABIThree.CameraHelper(scene3.camera.position, "y"), "value")
      .name("y");
    camerafolder
      .add(new ABIThree.CameraHelper(scene3.camera.position, "z"), "value")
      .name("z");
  } else {
    for (let item of gui.foldersRecursive()) {
      if (item._title === "camera") {
        item.destroy();
      }
    }
  }
});

if (scene3) {
  ABIThree.createTestMesh(scene1);
}
ABIThree.loadGLTFFile(monkey, scene2.scene, scene2.camera, null);

const gui2 = scene2.gui;
const gui3 = scene1.gui;

const zz = gui3.addFolder("zz");
zz.add({ Slider: 0 }, "Slider", 0, 1).disable().enable();

const color = gui2.addFolder("color");
const colorString = (str) => color.addColor({ x: str }, "x").name(`"${str}"`);

colorString("#aa00Ff");
colorString("aa00Ff");
colorString("0xaa00Ff");
colorString("#a0f");
colorString("a0f");
colorString("rgb(170, 0, 255)");

allScenes.animate();
