import * as THREE from "three";

/**
 * @module GUIHelper
 */

/**
 * This helper is for setting color on object
 * @example
 * const allScenes = new ABIThree.Scenes(container);
 * const scene1 = allScenes.getScene();
 * const gui = scene1.gui;
 * gui.addColor(new ABIThree.ColorGUIHelper(scene1.scene, "background"), "value").name("background_color");
 *
 */
class ColorGUIHelper {
  constructor(object, prop) {
    /**
     * The object that the user want to control in GUI
     * @type {object}
     */
    this.object = object;
    /**
     * The object' attribute that the user want to set
     * @type {string}
     */
    this.prop = prop;
  }
  get value() {
    return `#${this.object[this.prop].getHexString()}`;
  }
  set value(hexString) {
    this.object[this.prop] = new THREE.Color(hexString);
  }
}

/**
 * This helper is for setting camera position
 * @example
 * const allScenes = new ABIThree.Scenes(container);
 * const scene1 = allScenes.getScene();
 * const gui = scene1.gui;
 * let camerafolder = gui.addFolder("camera");
 *     camerafolder.add(new ABIThree.CameraHelper(scene1.camera.position, "x"), "value")
                   .name("x");
 *
 */
class CameraHelper {
  constructor(object, prop) {
    /**
     * The object that the user want to control in GUI
     * @type {object}
     */
    this.object = object;
    /**
     * The object' attribute that the user want to set
     * @type {string}
     */
    this.prop = prop;
  }
  get value() {
    return this.object[this.prop];
  }
  set value(v) {
    this.object[this.prop] = v;
  }
}

export { ColorGUIHelper, CameraHelper };
