import * as THREE from "three";
import Stats from "three/examples/jsm/libs/stats.module.js";
import { GUI } from "lil-gui";
import { createCamera, createLight, createTestMesh } from "./base.js";
import { buildGUI } from "./gui.js";
import ImageLoader from "./imageLoader.js";
import { loadObjFile, loadMTLFile, loadGLTFFile } from "./loadModules";
import Scenes from "./scenes.js";
import "./css/style.css";

export {
  Scenes,
  loadObjFile,
  loadMTLFile,
  loadGLTFFile,
  ImageLoader,
  createTestMesh,
  buildGUI,
};
