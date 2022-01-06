import {
  Scenes,
  ImageLoader,
  createTestMesh,
} from "../../ABIThreeLibrary/scenes";
import data from "./dicom.json";
import "./mystyle.css";

const container = document.querySelector("#container_root");
const allScenes = new Scenes(container, 4);
let dicom_file_paths = [];
for (let item of data) {
  dicom_file_paths.push(require("../assets/images/dicom1/" + item));
}

const scene1 = allScenes.getScene(0);
const scene2 = allScenes.getScene(1);
const scene3 = allScenes.getScene(2);

scene2.camera.position.set(0, 0, 500);
scene2.camera.far = 1000;

let imageLoader = new ImageLoader(
  "Image",
  dicom_file_paths,
  this,
  scene2.scene,
  scene2.camera,
  scene2.gui,
  scene2.elem
);
imageLoader.viewImage();

createTestMesh(scene3);

// for (let info of c.sceneInfos) {
//   if (info === c.sceneInfos[1]) {
//     const scene = info.scene;
//     const camera = info.camera;
//     camera.position.set(0, 0, 500);
//     camera.far = 1000;
//     console.log(camera);
//     const gui = c.gui;
//     const elem = info.elem;
//     let imageLoader = new ImageLoader(
//       "Image",
//       dicom_file_paths,
//       this,
//       scene,
//       camera,
//       gui,
//       elem
//     );
//     imageLoader.viewImage();
//   } else {
//     createTestMesh(info);
//   }
// }
