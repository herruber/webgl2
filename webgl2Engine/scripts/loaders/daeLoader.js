

var daeLoader = (function () {


    function parseXML(content) {

            var objects = content.getElementsByTagName("mesh");
            var geometries = [];
            var meshes = [];

            var glObjects = [];

            for (var i = 0; i < objects.length; i++) {
                var object = new gl2object("", new transform());
                var obj = objects[i];
                var geometry = new gl2geometry();
                var mesh = new gl2mesh("none", geometry);
                var arrays = obj.getElementsByTagName("float_array");

                var verts = [];
                var uvs = [];


                var ids = [];

                var triangles = content.getElementsByTagName("triangles")[0].getElementsByTagName("p")[0].innerHTML;
                debugger;
                triangles = triangles.split(" ");
              
                for (var j = 0; j < triangles.length; j++) {
                    ids.push(parseInt(triangles[j]))
                }

                for (var j = 0; j < arrays.length; j++) {
                    debugger;
                    var arr = arrays[j];

                    if (arr.id.indexOf("positions") > -1) {

                        var txtarr = arr.innerHTML.split(" ");

                        for (var k = 0; k < ids.length; k++) {
                            verts.push(parseFloat(txtarr[ids[k]]));
                        }

                    }
                    else if (arr.id.indexOf("normals")) {
                      
                      
                    }
                    else if (arr.id.indexOf("map-0")) {
                        var txtarr = arr.innerHTML.split(" ");

                        uvs.push(parseInt(txtarr[k]));
                    }
                }

                var arrays = obj.getElementsByTagName("int_array");
                 console.log(content)
                for (var j = 0; j < arrays.length; j++) {
                    var arr = arrays[j];
                }

                geometry.set(verts, uvs);
                object.meshes.push(mesh)
                glObjects.push(object);
            }

            return glObjects[0];
    }

    function loadFromUrl(url, object) {

        _get(url, function (content) {

            objectCache.objects[url.getFileName()] = parseXML(content);
            objectCache.current++;

            //When we get an object we compare to see if all required objects are loaded
            objectCache.check();

        });


    }


    return {
        loadFromUrl: loadFromUrl
    }

}())