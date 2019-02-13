
var canvas = document.getElementById("render-frame");
var renderer = new gl2renderer(canvas);
var camera = new gl2camera(45, 1200/800, 0.2, 1000);


var scene = new scene();
var plane = new gl2object("plane", new transform());
plane.meshes.push(new gl2mesh("", new gl2plane([1, 1, 1])));
scene.children.push(plane);

renderer.render();

