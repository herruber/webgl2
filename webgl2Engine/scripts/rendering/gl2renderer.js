var gl;
var fsQuad;

var bufferTextures;
var depthTexture;

function createGbuffer(width, height) {
    width = 1200;
    height = 800;
    bufferTextures = [gl.createTexture(), gl.createTexture(), gl.createTexture(), gl.createTexture()];
    var fb = gl.createFramebuffer();
    gl.bindFramebuffer(gl.FRAMEBUFFER, fb);


    for (var i = 0; i < bufferTextures.length; i++) {

        var active;

        switch (i) {
            case 0:
                active = gl.TEXTURE0;
                break;
            case 1:
                active = gl.TEXTURE1;
                break;
            case 2:
                active = gl.TEXTURE2;
                break;
            case 3:
                active = gl.TEXTURE3;
                break;
            default:

        }
        gl.activeTexture(active);
        gl.bindTexture(gl.TEXTURE_2D, bufferTextures[i]);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, width, height, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
        gl.framebufferTexture2D(gl.DRAW_FRAMEBUFFER, gl.COLOR_ATTACHMENT0 + i, gl.TEXTURE_2D, bufferTextures[i], 0);

        //Below used to make non power of textures work as rendertargets. ex a screen is almost never exactly power of two
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    }

    gl.drawBuffers([gl.COLOR_ATTACHMENT0, gl.COLOR_ATTACHMENT1, gl.COLOR_ATTACHMENT2, gl.COLOR_ATTACHMENT3]);

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

    this.mainMaterial = fsQuad.meshes.first().geometries.first().material;

    this.gbuffer = createGbuffer(element.width, element.height);

    this.resize = function (canvas) {
        // Lookup the size the browser is displaying the canvas.

        var displayWidth = canvas.clientWidth;
        var displayHeight = canvas.clientHeight;

        // Check if the canvas is not the same size.
        if (canvas.width != displayWidth ||
            canvas.height != displayHeight) {

            // Make the canvas the same size
            canvas.width = displayWidth;
            canvas.height = displayHeight;
        }
    }

    this.adjustDrawingBufferSize = function() {
        var glContext = gl;
        var canvas = glContext.canvas;
        var pixelRatio = 1; // window.devicePixelRatio ? window.devicePixelRatio : 1.0;
     
        // Checking width and height individually to avoid two resize operations if only 
        // one was needed. Since this function was called, then at least on of them was
        // changed,
        if (canvas.width  != Math.floor(canvas.clientWidth  * pixelRatio)) canvas.width  = pixelRatio * canvas.clientWidth ;
        if (canvas.height != Math.floor(canvas.clientHeight * pixelRatio)) canvas.height = pixelRatio * canvas.clientHeight;
     
        // Set the new viewport dimensions,
        
        self.resize(canvas);
        glContext.viewport(0, 0, 1200, 800);
    }

    this.getAttributes = function (program, geometry) {

        var attributes = ["position", "uv"];



        for (var i = 0; i < attributes.length; i++) {

            var size = 0;
            if (attributes[i] === "position") {
                size = 3;
                gl.bindBuffer(gl.ARRAY_BUFFER, geometry.vertices);
            }
            if (attributes[i] === "uv") {
                size = 2;
                gl.bindBuffer(gl.ARRAY_BUFFER, geometry.uvs);
            }



            // Get the attribute location
            var location = gl.getAttribLocation(program, attributes[i]);

            // Point an attribute to the currently bound VBO
            gl.vertexAttribPointer(location, size, gl.FLOAT, false, 0, 0);

            // Enable the attribute
            gl.enableVertexAttribArray(location);

        }



    }

    this.uploadMatrices = function (program, object) {
        gl.uniformMatrix4fv(gl.getUniformLocation(program, "modelMatrix"), false, object.transform.modelMatrix)
        gl.uniformMatrix4fv(gl.getUniformLocation(program, "projectionMatrix"), false, camera.transform.projectionMatrix)
        gl.uniformMatrix4fv(gl.getUniformLocation(program, "viewMatrix"), false, camera.transform.viewMatrix)
    
    }

    this.updateDirections

    this.updateMatrices = function (object) {

        var transform = object.transform;
        transform.modelMatrix = new m4_transform(transform);
        transform.viewMatrix = new m4_inverse(transform.modelMatrix);
        setTransformDirections(transform);

        switch (object.type) {
            case "gl2object":
                break;
            case "gl2camera":                
                transform.projectionMatrix = new m4_perspective(object.fov, object.aspect, object.near, object.far);
                break;
            default:

        }
    }


    this.renderObject = function (object) {

        var mesh = object.meshes.first();

        self.updateMatrices(object);
     
      
        for (var i = 0; i < mesh.geometries.length; i++) {

            var geometry = mesh.geometries[i];
            var program = geometry.material.program;
            gl.useProgram(program);
            var uniforms = geometry.material.uniforms;
          
            // Tell it to use our program (pair of shaders)

            self.uploadMatrices(program, object)

            //Set all the uniform values

            for (var prop in uniforms) {
                gl.uniform1i(uniforms[prop].location, uniforms[prop].value);
            }

            self.getAttributes(program, geometry);

            // Draw the geometry.
            var primitiveType = gl.TRIANGLES;
            gl.drawArrays(primitiveType, 0, geometry.vertexCount);
        }

    }

    this.renderFullscreen = function () {

        var geometry = fsQuad.meshes.first().geometries[0];
        var program = geometry.material.program;
        var uniforms = geometry.material.uniforms;


        // Tell it to use our program (pair of shaders)
        gl.useProgram(program);

        //Set all the uniform values
        //for (var prop in uniforms) {
        //    gl.uniform1i(uniforms[prop].location, uniforms[prop].value);
        //}

        self.getAttributes(program, geometry);

        // Draw the geometry.
        var primitiveType = gl.TRIANGLES;
        gl.drawArrays(primitiveType, 0, 6);

    }

    this.render = function () {

        scene.setActive();

        self.adjustDrawingBufferSize();
        gl.viewport(0, 0, element.width, element.height);
        /////////////////////////
        // DRAW TO GBUFFER
        /////////////////////////
        gl.bindFramebuffer(gl.FRAMEBUFFER, self.gbuffer);
        gl.depthMask(true);
        gl.disable(gl.BLEND);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

       // camera.transform.position[2] = Math.sin(performance.now() / 220);
       // camera.transform.rotation[0] = Math.sin(performance.now() / 600) * 45;
        self.updateMatrices(camera)

        for (var i = 0; i < scene.active.length; i++) {
            self.renderObject(scene.active[i])
        }
        gl.useProgram(self.mainMaterial.program);

        var uniforms = self.mainMaterial.uniforms;

        uniforms.tex1.value = bufferTextures[0];
        uniforms.tex2.value = bufferTextures[1];
        uniforms.tex3.value = bufferTextures[2];
        uniforms.tex4.value = bufferTextures[3];

        //Decide which assigned texture should be used where
        gl.uniform1i(uniforms.tex1.location, 0);
        gl.uniform1i(uniforms.tex2.location, 1);
        gl.uniform1i(uniforms.tex3.location, 2);
        gl.uniform1i(uniforms.tex4.location, 3);

        gl.bindFramebuffer(gl.FRAMEBUFFER, null);
        self.renderFullscreen();

        //When done request another frame
        requestAnimationFrame(self.render);
    }

    return this;

}