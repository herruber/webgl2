
var shaders = {

    basic: {
        vertex: `#version 300 es

        // an attribute is an input (in) to a vertex shader.
        // It will receive data from a buffer
        in vec4 position;
        in vec2 uv;

        uniform mat4 modelMatrix;
        uniform mat4 viewMatrix;
        uniform mat4 projectionMatrix;

        out vec2 vUv;
        // all shaders have a main function
        void main() {
           vUv = uv;
          // gl_Position is a special variable a vertex shader
          // is responsible for setting
          //vec4 pos =  modelMatrix  * viewMatrix * projectionMatrix* position;
          vec4 pos =  projectionMatrix * viewMatrix * modelMatrix * position;
          //vec4 pos =  modelMatrix * viewMatrix * projectionMatrix * position;
          gl_Position = pos;
        }`
        ,
        fragment: `#version 300 es

        // fragment shaders don't have a default precision so we need
        // to pick one. mediump is a good default. It means "medium precision"
        precision mediump float;

        in vec2 vUv;
       
        // we need to declare an output for the fragment shader
        layout (location = 0) out vec4 outColor0;
        layout (location = 1) out vec4 outColor1;
        layout (location = 2) out vec4 outColor2;
        layout (location = 3) out vec4 outColor3;

        void main() {
          // Just set the output to a constant redish-purple
          outColor0 = vec4(1, 0, 0, 1);
          outColor1 = vec4(1, 1, 0, 1);
          outColor2 = vec4(0, 1, 1, 1);
          outColor3 = vec4(1, 0, 1, 1);
        }`,
        uniforms: {

        }
    },
    gBuffer: {
        vertex: `#version 300 es

        // an attribute is an input (in) to a vertex shader.
        // It will receive data from a buffer
        in vec4 position;
        in vec2 uv;
        out vec2 vUv;
        // all shaders have a main function
        void main() {
           vUv = uv;
          // gl_Position is a special variable a vertex shader
          // is responsible for setting
          gl_Position = position;
        }`
        ,
        fragment: `#version 300 es

        // fragment shaders don't have a default precision so we need
        // to pick one. mediump is a good default. It means "medium precision"
        precision mediump float;

        in vec2 vUv;

        uniform sampler2D tex1;
        uniform sampler2D tex2;
        uniform sampler2D tex3;
        uniform sampler2D tex4;

        // we need to declare an output for the fragment shader
        out vec4 outColor;

        vec4 sampleCenter(sampler2D sampler) {

             return texture(sampler, vec2(0.5, 0.5));
        }

        void main() {
          vec4 cola = sampleCenter(tex1);
          vec4 colb = sampleCenter(tex2);
          vec4 colc = sampleCenter(tex3);
          vec4 cold = sampleCenter(tex4);

          vec4 color;

          vec4 lerpx = mix(texture(tex1, vUv), texture(tex2, vUv), vUv.x);
          vec4 lerpy = mix(texture(tex3, vUv), texture(tex4, vUv), vUv.y);



          outColor = (lerpx + lerpy) / 2.0;
        }`,
        uniforms: {
            tex1: { name: "tex1", location: -1, value: null },
            tex2: { name: "tex2", location: -1, value: null },
            tex3: { name: "tex3", location: -1, value: null },
            tex4: { name: "tex4", location: -1, value: null }
        }
    }
}


function compileShaderLibrary() {

    for (var type in shaders) {

        var shader = shaders[type];
        shader.vertex = compileShader(shader.vertex, gl.VERTEX_SHADER);
        shader.fragment = compileShader(shader.fragment, gl.FRAGMENT_SHADER);

    }
}


function compileShader(shaderSource, shaderType) {
    // Create the shader object

    var shader = gl.createShader(shaderType);

    // Set the shader source code.
    gl.shaderSource(shader, shaderSource);

    // Compile the shader
    gl.compileShader(shader);

    // Check if it compiled
    var success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
    if (!success) {
        // Something went wrong during compilation; get the error
        throw "could not compile shader:" + gl.getShaderInfoLog(shader);
    }

    return shader;
}