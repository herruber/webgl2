var gl;
var fsQuad;

var bufferTextures;
function createGbuffer(width, height) {

    bufferTextures = [gl.createTexture(), gl.createTexture(), gl.createTexture(), gl.createTexture()];
    var fb = gl.createFramebuffer();
    gl.bindFramebuffer(gl.FRAMEBUFFER, fb);


    for (var i = 0; i < bufferTextures.length; i++) {
        gl.bindTexture(gl.TEXTURE_2D, bufferTextures[i]);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, width, height, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
        gl.framebufferTexture2D(gl.DRAW_FRAMEBUFFER, gl.COLOR_ATTACHMENT0 + i, gl.TEXTURE_2D, bufferTextures[i], 0);
       
    //Below used to make non power of textures work as rendertargets. ex a screen is almost never exactly power of two
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
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

    compileShaderLibrary();

    fsQuad = new gl2object("fsQuad", new transform());
    fsQuad.meshes.push(new gl2mesh("fsQuad", new gl2plane([2, 2, 2], new gl2material("gBufferMaterial", shaders.gBuffer))));
   

    this.gbuffer = createGbuffer(element.width, element.height);
    fsQuad.meshes.first().geometries.first().material.uniforms.tex1.value = bufferTextures[0];
    fsQuad.meshes.first().geometries.first().material.uniforms.tex2.value = bufferTextures[1];
    fsQuad.meshes.first().geometries.first().material.uniforms.tex3.value = bufferTextures[2];
    fsQuad.meshes.first().geometries.first().material.uniforms.tex4.value = bufferTextures[3];

    this.renderObject = function(object) {
        

        for (var i = 0; i < object.geometries.length; i++) {

            var geometry = object.geometries[i];
            var program = geometry.material.program;
            var uniforms = geometry.material.uniforms;

           
            // Tell it to use our program (pair of shaders)
            gl.useProgram(program);
          
            //Set all the uniform values
            for (var prop in uniforms) {
                gl.uniform1i(uniforms[prop].location, uniforms[prop].value);
            }

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

      
        //Loop through scene objects and update active objects
        scene.setActive();
        //Prepare the canvas by clearing the old frame
            gl.clearColor(0, 0, 0, 1);
            gl.enable(gl.DEPTH_TEST);
            gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
            gl.viewport(0, 0, element.width, element.height);

        //Set drawbuffers for rendering to gbuffer, rebinding the framebuffer that stores the images.
        gl.bindFramebuffer(gl.FRAMEBUFFER, self.gbuffer);
        gl.drawBuffers([gl.COLOR_ATTACHMENT0, gl.COLOR_ATTACHMENT1, gl.COLOR_ATTACHMENT2, gl.COLOR_ATTACHMENT3]);
        //Render all geometry to the gbuffer
        scene.active.each(function (obj) {

            obj.meshes.each(function (mesh) {
                self.renderObject(mesh);
            })
        })

        var uniforms = fsQuad.meshes.first().geometries.first().material.uniforms;
        uniforms.tex1.value = bufferTextures[0];
        uniforms.tex2.value = bufferTextures[1];
        uniforms.tex3.value = bufferTextures[2];
        uniforms.tex4.value = bufferTextures[3];

        //removes the buffer and renders to screen
        gl.bindFramebuffer(gl.FRAMEBUFFER, null);
        self.renderObject(fsQuad.meshes.first());

        //When done request another frame
        requestAnimationFrame(self.render);
    }

    return this;

}