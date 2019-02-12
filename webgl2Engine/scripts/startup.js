

var canvas = document.getElementById("render-frame");
var renderer = new gl2renderer(canvas);
debugger;
var scene = new scene();
var cube = new gl2object("cube", new transform());
cube.meshes.push(new gl2mesh().plane());
scene.children.push(cube);

renderer.render();

