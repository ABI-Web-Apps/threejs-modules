import * as THREE from "three";
/**
 * To convert the screen position to 3D world postion
 * @param {object} sceneInfo - Current sceneInfo the user opereated. Include these infos: scene, camera, contrls, elem, etc.
 * @param {object} pos - The screen position when user click. Format: {x:0,y:0}
 * @returns {object} - Vector3
 */
function convertScreenPosto3DPos(sceneInfo, pos) {
  let vec = new THREE.Vector3(); // create once and reuse
  let target = new THREE.Vector3(); // create once and reuse
  vec.set(
    (pos.x / sceneInfo.elem.clientWidth) * 2 - 1,
    -(pos.y / sceneInfo.elem.clientHeight) * 2 + 1,
    0.5
  );
  let camera = sceneInfo.camera;
  vec.unproject(camera);
  vec.sub(camera.position).normalize();
  var distance = (0.2 - camera.position.z) / vec.z;
  target.copy(camera.position).add(vec.multiplyScalar(distance));
  return target;
}

/**
 * To convert mesh world position to screen position
 * @param {object} sceneInfo - Current sceneInfo the user opereated. Include these infos: scene, camera, contrls, elem, etc.
 * @param {object} mesh - The mesh be selected.
 * @returns {object} - Vector2
 */
function convert3DPostoScreenPos(sceneInfo, mesh) {
  const worldVetor = new THREE.Vector3();
  mesh.getWorldPosition(worldVetor);

  const stndardVector = worldVetor.project(sceneInfo.camera);
  const centerX = sceneInfo.elem.clientWidth / 2;
  const centerY = sceneInfo.elem.clientHeight / 2;

  const x = Math.round(centerX * stndardVector.x + centerX);
  const y = Math.round(centerY * stndardVector.y + centerY);

  const pos = new THREE.Vector2(x, y);
  return pos;
}

export { convertScreenPosto3DPos, convert3DPostoScreenPos };
