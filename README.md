# Copper3D

This library is base on three.js and ami.js.
Current functions:

- Load obj file model
- Load mtl file model
- Load gltf file model
- Load MRI images
- Multiple scenes
- Interacting with MRI images
- Draw circle on MRI images

## How to use:

    import * as Copper from 'copper3d';
    const allScenes = new Copper.Scenes(HTMLElement, 4, {0, 0, 1000});
    allScenes.animate();

## API Tutorial:

See: https://linkungao.github.io/threejs-modules-1/

## How to see examples:

- cd Copper3D
- npm install
- npm run serve

### The operations for draw circle function

- a. Adjust the MRI image before you draw circle on it.
- b. Enabled draw circle function in GUI panel.
- c. If you draw circle on a wrong position, you can use delete key on your keyboard.
