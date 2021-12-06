# threejs-modules

## The basic library useage:

![avatar](/public/images/1.png)

## ABI_ThreeModule

- This folder is js library
  It includes index.js, and below is the files structure image.

![avatar](/public/images/2.png)

- How to use:
  improt \* as Your_Variable_name from "../../ABI_ThreeModule/index.js"; (this relative path is used in examples, if you want to use you may change to your path)

  index.js:
  initThreeD():
  @Paras: a dom element
  Return: {Scene, Camera}
  export:{initThreeD, loadObjFile, loadMTLFile, loadGLTFFile}

  basefn.js:
  createCamera():
  @Paras: type, aspect, fov = 75, near = 1, far = 1000, s = 100 (The type is a bool, ture means PerspectiveCamera, false means OrthographicCamera)
  Return Camera

  createLight():
  @Paras: color, intensity
  Return {pointLight, ambientLight}

  loadInmage():
  @Paras: imageUrl, container, scene (the container is a dom element is same as initThreeD() parameter)

  export { createCamera, createLight, loadImage }

  gui.js:
  buildGUI():
  @Paras: - gui (the lil-GUI obj) - controlers (the objects while will be controled) - controler_flag (flags for different controlers)
  export { buildGUI }

  loadModules.js:
  getMaterial():
  @Paras: null
  Return: material

  loadObjFile():
  @Paras: url(the .Obj file path/url), scene, camera, material=null

  loadMTLFile():
  @Paras:

  - url_mtl: .mtl file url
  - url_obj: .obj file url
  - scene: the basic scene object
  - camera: the camera object
  - progressBar: the loading bar dom

  loadGLTFFile():
  @Paras:

  - url: .gltf/.glb file url
  - scene: the basic scene object
  - camera: the camera object
  - progressBar: the loading bar dom
    export { loadObjFile, loadMTLFile, loadGLTFFile }

## App folder

    This folder store the examples for how to use our library

- How to use example:
  npm install -g live-server
  liver-server
