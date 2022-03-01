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

```
    import * as Copper from 'copper3d';
    const allScenes = new Copper.Scenes(HTMLElement, 4, {0, 0, 1000});
    allScenes.animate();
```

An example for quickly build multiple scenes:

    In the HTML file, Vue or React components,
    you should create a HTMLElement container for copper3d.
    E.g., in index.html

```
    <div id="container_root"></div>
```

    And the css for container might be:

```
    #container_root {
            width: 100vw;
            height: 100vh;
        }
```

    In JS:

```
    import * as Copper from "copper3d";
    const container = document.querySelector("#container_root");
    const numberOfScene = 3;
    const allScenes = new Copper.Scenes(container, numberOfScene);

    const scene1 = allScenes.getScene(0);
    const scene2 = allScenes.getScene(1);
    const scene3 = allScenes.getScene(2);

    Copper.createTestMesh(scene1);
    Copper.createTestMesh(scene2);
    Copper.createTestMesh(scene3);

    allScenes.animate();
```

In the end, you might see this screenshot in your browser:
![how to use Multiple scenes](/doc-screenshorts/01_howtouse.jpg "Create Multiple scenes")

## API Tutorial:

See: https://linkungao.github.io/threejs-modules-1/

## See examples here:

See: https://copper3d-examples.herokuapp.com/

## How to see examples locally:

- cd Copper3D
- npm install
- npm run serve

### The operations for draw circle function

- a. Adjust the MRI image before you draw circle on it.
- b. Enabled draw circle function in GUI panel.
- c. If you draw circle on a wrong position, you can use delete key on your keyboard.
