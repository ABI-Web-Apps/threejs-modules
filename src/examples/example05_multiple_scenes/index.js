import {
  ABIThree,
  ImageLoader,
  createTestMesh,
} from "../../ABIThreeLibrary/abi";
import data from "./dicom.json";
import "./mystyle.css";

const container = document.querySelector("#container_root");
const c = new ABIThree(container, 3);
let dicom_file_paths = [];
for (let item of data) {
  dicom_file_paths.push(require("../assets/images/dicom1/" + item));
}
for (let info of c.sceneInfos) {
  if (info === c.sceneInfos[1]) {
    const scene = info.scene;
    const camera = info.camera;
    camera.position.set(0, 0, 500);
    camera.far = 1000;
    console.log(camera);
    const gui = c.gui;
    const elem = info.elem;
    let imageLoader = new ImageLoader(
      "Image",
      dicom_file_paths,
      this,
      scene,
      camera,
      gui,
      elem
    );
    imageLoader.viewImage();
  } else {
    createTestMesh(info);
  }
}
