import * as ABIThree from "../../Copper3D/main";
import data from "./dicom.json";
import monkey from "../assets/modules/monkey.glb";
import "./mystyle.css";

const container = document.querySelector("#container_root");
const numberOfScene = 1;
const Scene = new ABIThree.Scenes(container, numberOfScene);
let dicom_file_paths = [];
for (let item of data) {
  dicom_file_paths.push(require("../assets/images/dicom2/" + item));
}

const scene1 = Scene.getScene(0);

const div = ABIThree.createPanel(280, 200, "rgba(164,241,255,0.3)");
scene1.elem.appendChild(div);

const skin = document.createElement("div");
skin.style.color = "rgb(243, 242, 135)";
skin.innerHTML = "Skin     :" + 0 + "    mm";
const ribcage = document.createElement("div");
ribcage.style.color = "rgb(26, 139, 252)";
ribcage.innerHTML = "Ribcage     :" + 0 + "    mm";
const nipple = document.createElement("div");
nipple.style.color = "rgb(245, 103, 135)";
nipple.innerHTML = "Nipple     :" + 0 + "    mm";

div.appendChild(skin);
div.appendChild(ribcage);
div.appendChild(nipple);

const gui = scene1.gui;

const screenPosCallback = (pos) => {
  skin.innerHTML = "Skin     :" + pos.skin + "    mm";
  ribcage.innerHTML = "Ribcage     :" + pos.ribcage + "    mm";
  nipple.innerHTML = "Nipple     :" + pos.nipple + "    mm";
};

let imageLoader = new ABIThree.ImageLoader(
  "Image",
  dicom_file_paths,
  scene1,
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

const getMesh = (mesh) => {
  console.log(mesh);
  mesh[0].scale.set(50, 50, 50);
  mesh[0].position.set(-100, -50, 0);
  scene1.camera.position.set(0, 0, 500);
  scene1.camera.far = 1000;
};

ABIThree.loadGLTFFile(monkey, scene1.scene, scene1.camera, getMesh);

Scene.animate();
