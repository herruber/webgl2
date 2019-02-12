var gl;

function createGbuffer(width, height) {

    var tex = [gl.createTexture(), gl.createTexture(), gl.createTexture(), gl.createTexture()];
    
    var fb = gl.createFramebuffer();
    gl.bindFramebuffer(gl.FRAMEBUFFER, fb);


    for (var i = 0; i < tex.length; i++) {
        gl.bindTexture(gl.TEXTURE_2D, tex[i]);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, width, height, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
        gl.framebufferTexture2D(gl.DRAW_FRAMEBUFFER, gl.COLOR_ATTACHMENT0 + i, gl.TEXTURE_2D, tex[i], 0);
       
    }


    return fb;
}

function gl2renderer(element) {
    var self = this;
    this.element = element;

    gl = element.getContext("webgl2");

    if (!gl) {
        alert("!WARNING: This device does not support webgl2");
    }

    this.gbuffer = createGbuffer(element.width, element.height);



    this.renderObject = function(object) {
        

        for (var i = 0; i < object.geometries.length; i++) {

            var geometry = object.geometries[i];
            var program = geometry.material.program;
            // Tell it to use our program (pair of shaders)
            gl.useProgram(program);
          
            gl.bindBuffer(gl.ARRAY_BUFFER, geometry.vertices);

            // Get the attribute location
            var location = gl.getAttribLocation(program, "position");

            // Point an attribute to the currently bound VBO
            gl.vertexAttribPointer(location, 3, gl.FLOAT, false, 0, 0);

            // Enable the attribute
            gl.enableVertexAttribArray(location);
           
            // Draw the geometry.
            var primitiveType = gl.TRIANGLES;
            gl.drawArrays(primitiveType, 0, 6);
        }

    }

    this.render = function() {

        function prepareCanvas() {
            gl.clearColor(0, 0, 0, 1);
            gl.enable(gl.DEPTH_TEST);
            gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
            gl.viewport(0, 0, element.width, element.height);
        }
        
        scene.setActive();
        prepareCanvas();

        gl.drawBuffers([gl.COLOR_ATTACHMENT0, gl.COLOR_ATTACHMENT1, gl.COLOR_ATTACHMENT2, gl.COLOR_ATTACHMENT3]);

        scene.active.each(function (obj) {

            obj.meshes.each(function (mesh) {
                self.renderObject(mesh);

            })

        })

        requestAnimationFrame(self.render);
    }

    return this;

}