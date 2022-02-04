import "./mystyle.css";
import { GUI } from "lil-gui";

const container = document.getElementById("container_root");
const a = document.getElementById("a");
const b = document.getElementById("b");
const c = document.getElementById("c");
const d = document.createElement("div");
const e = document.createElement("div");
container.appendChild(d);
container.appendChild(e);

for (let i = 0; i < 3; i++) {
  const elem = document.createElement("div");
  container.appendChild(elem);
  const gui_elem = new GUI({ container: elem });
  const zg = gui_elem.addFolder("zz");
  zg.add({ Slider: 0 }, "Slider", 0, 1).disable().enable();
}

const gui1 = new GUI({ container: a });
const gui2 = new GUI({ container: b });
const gui3 = new GUI({ container: c });
const gui4 = new GUI({ container: d });
const gui5 = new GUI({ container: e });

const zz = gui1.addFolder("zz");
zz.add({ Slider: 0 }, "Slider", 0, 1).disable().enable();
const color = gui2.addFolder("color");
const colorString = (str) => color.addColor({ x: str }, "x").name(`"${str}"`);

colorString("#aa00Ff");
colorString("aa00Ff");
colorString("0xaa00Ff");
colorString("#a0f");
colorString("a0f");
colorString("rgb(170, 0, 255)");

const z4 = gui4.addFolder("zz");
z4.add({ Slider: 0 }, "Slider", 0, 1).disable().enable();

const z5 = gui5.addFolder("zz");
z5.add({ haha: 0 }, "haha", 0, 1).disable().enable();
