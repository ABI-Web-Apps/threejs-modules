import { initThreeD, loadImage } from "../../ABI_ThreeModule/index.js";

let canvas = document.getElementById("bg");
let { scene } = initThreeD(canvas);

loadImage(
  "https://cdn.rawgit.com/FNNDSC/data/master/nifti/adi_brain/adi_brain.nii.gz",
  canvas,
  scene
);
