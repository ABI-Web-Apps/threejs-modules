import { Clock, Group, SpotLight } from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import somethingModel from "./monkey.glb";

export class Something extends Group {
  clock = new Clock();
  //   lamp: SpotLight | undefined;

  constructor() {
    super();
    const gltfLoader = new GLTFLoader();
    console.log(somethingModel);
    gltfLoader.load(somethingModel, (gltf) => {
      const model = gltf.scene;
      this.add(model);
    });
  }

  animate() {
    var delta = this.clock.getDelta();
    this.mixer?.update(delta);
  }
}
