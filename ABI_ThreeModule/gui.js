// import * as THREE from "../three/build/three.module.js";
import * as THREE from "https://threejs.org/build/three.module.js";

class ColorGUIHelper {
  constructor(object, prop) {
    this.object = object;
    this.prop = prop;
  }
  get value() {
    return `#${this.object[this.prop].getHexString()}`;
  }
  set value(hexString) {
    // this.object[this.prop].set(hexString);
    this.object[this.prop] = new THREE.Color(hexString);
  }
}

class CameraHelper {
  constructor(object, prop) {
    this.object = object;
    this.prop = prop;
  }
  get value() {
    return this.object[this.prop];
  }
  set value(v) {
    this.object[this.prop] = v;
  }
}

function buildGUI(gui, controlers, controler_flag) {
  gui.add(controler_flag, "cameraOpen").onChange((v) => {
    if (v) {
      let camerafolder = gui.addFolder("camera");
      camerafolder
        .add(new CameraHelper(controlers.camera.position, "x"), "value")
        .name("x");
      camerafolder
        .add(new CameraHelper(controlers.camera.position, "y"), "value")
        .name("y");
      camerafolder
        .add(new CameraHelper(controlers.camera.position, "z"), "value")
        .name("z");
    } else {
      for (let item of gui.foldersRecursive()) {
        if (item._title === "camera") {
          item.destroy();
        }
      }
    }
  });

  gui
    .addColor(new ColorGUIHelper(controlers.scene, "background"), "value")
    .name("background_color");
}

export { buildGUI };
