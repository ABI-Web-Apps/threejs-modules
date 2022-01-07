import * as ABIThree from "../../ABIThreeLibrary/main";
import "../assets/css/style.css";
import data from "./dicom.json";
// import { readFileList } from "../ABIThreeLibrary/utils/readFiles";

let container = document.getElementById("container_root");
let allScenes = new ABIThree.Scenes(container, 1);

const scence1 = allScenes.getScene();

// console.log(z);
let dicom_file_paths = [];
for (let item of data) {
  dicom_file_paths.push(require("../assets/images/dicom1/" + item));
}

let imageLoader = new ABIThree.ImageLoader(
  "Image",
  dicom_file_paths,
  this,
  scence1.scene,
  scence1.camera,
  scence1.gui,
  scence1.elem
);

imageLoader.viewImage();
