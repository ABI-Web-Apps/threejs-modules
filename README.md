# threejs-modules

## Issues

- The biggest issue is ami.js version is too old and it must use three.js which version is ^100,
  the current version is 0.135.0, the newst version has already remove and replace a lots of funtions and three.js objs attributes.
  If we sitll use the old version, I think it may very hard to programing, and even if we develop a three.js library base ami.js,
  it may also be buggy and not very stable. (just my personal understanding)
- The AMI.js has very less ducomention, there is a toturial document but is not good for current using ami version, and more
  importantly, all of ami.js offical example has serious bugs, it cannot open. So that made it hard for me to learn it.
- Indeed, ami.js can help us a lot on upload images and models, it may mostly used to deal with dicom/nii.gz files, and I try to find some alterntive way to instead ami.js,but I failed.
  So I don't know whether we need still to use ami.js with very old version three.js. (currently our library indules two types of three.js vesion, one is old version for ami.js, another is the newest one, there are some new functions we can use. I don't know includes two types version whether influent the maintain in the futrue or not, I guess it may yes)

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
  Return: {Scene}
  export:{initThreeD, loadImage}

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

## App folder

    This folder store the examples for how to use our library

- How to use example:
  npm install -g live-server
  liver-server
