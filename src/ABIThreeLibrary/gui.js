// import * as THREE from "../three/build/three.module.js";
import * as THREE from "three";

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
  // light gui folder
  {
    const lightFolder = gui.addFolder("Light");
    lightFolder.add(controlers.pointLight, "visible").name("pointLight");
    lightFolder.add(controlers.ambientLight, "visible").name("ambientLight");
    lightFolder.close();
  }
  {
    // renderer
    const renderFolder = gui.addFolder("Render");
    renderFolder
      .add(controlers.renderer, "physicallyCorrectLights")
      .name("Physic light");
    renderFolder
      .add(controlers.renderer.shadowMap, "enabled")
      .name("shadowMap");
    renderFolder.close();
  }

  gui
    .addColor(new ColorGUIHelper(controlers.scene, "background"), "value")
    .name("background_color");
}

export { buildGUI };
