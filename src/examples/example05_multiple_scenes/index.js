import {
  Scenes,
  ImageLoader,
  createTestMesh,
} from "../../ABIThreeLibrary/scenes";
import data from "./dicom.json";
import "./mystyle.css";
import { GUI } from "lil-gui";

const container = document.querySelector("#container_root");
const allScenes = new Scenes(container, 3);
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

let imageLoader = new ImageLoader(
  "Image",
  dicom_file_paths,
  this,
  scene3.scene,
  scene3.camera,
  gui,
  scene3.elem
);
imageLoader.viewImage();

if (scene3) {
  createTestMesh(scene1);
  createTestMesh(scene2);
}

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
