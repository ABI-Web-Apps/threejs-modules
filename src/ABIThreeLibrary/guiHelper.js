import * as THREE from "three";

export class ColorGUIHelper {
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

export class CameraHelper {
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
