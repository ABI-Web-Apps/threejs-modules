import * as ABIThree from "../../ABIThreeLibrary/main";
import "../assets/css/style.css";
import data from "./dicom.json";
// import { readFileList } from "../ABIThreeLibrary/utils/readFiles";

let canvas = document.getElementById("bg");
let { gui, scene, camera } = ABIThree.initThreeD(canvas);

// console.log(z);
let dicom_file_paths = [];
for (let item of data) {
  dicom_file_paths.push(require("../assets/images/dicom1/" + item));
}

let imageLoader = new ABIThree.ImageLoader(
  "Image",
  dicom_file_paths,
  this,
  scene,
  camera,
  gui,
  canvas
);

imageLoader.viewImage();
