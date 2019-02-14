
var canvas = document.getElementById("render-frame");
var camera = camera = new gl2camera(45, 1200 / 800, 0, 1000);
var renderer = new gl2renderer(canvas);
var scene1 = new scene();

var fileList = ["untitled.dae"];
var objectPath = "/files/";

var startup = (function () {

    objectCache.count = fileList.length;
    objectCache.required = ["untitled"];

    for (var i = 0; i < fileList.length; i++) {
        daeLoader.loadFromUrl(objectPath + fileList[i] );
    }

    function run() {

        gl2controls.controls = new simpleControls(canvas, camera);

        //var plane = new gl2object("plane", new transform());
        //plane.transform.position[2] = -5;
        //plane.meshes.push(new gl2mesh("", new gl2plane([1, 1, 1])));
        //scene.children.push(plane);
        debugger;
        var box = new gl2box("box", [1, 1, 1], new transform());
        box.transform.position = [2, 1, -3];
        scene.children.push(box);

        //Setup events
        document.addEventListener("keydown", function (event) {

            if (!camera || !gl2controls.controls) return;
            gl2controls.controls.keyDown(event);
        })

        document.addEventListener("mousemove", function (event) {

            gl2controls.axes.fromEvent(event);

            gl2controls.controls.rotate(gl2controls.axes.screen.dir);
        })

        renderer.render();
    }

    return {
        run: run
    }


}())

