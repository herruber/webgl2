var shaders = {

    basic: {
        vertex:`#version 300 es

        // an attribute is an input (in) to a vertex shader.
        // It will receive data from a buffer
        in vec4 position;

        // all shaders have a main function
        void main() {

          // gl_Position is a special variable a vertex shader
          // is responsible for setting
          gl_Position = position;
        }`
        ,
        fragment: `#version 300 es

        // fragment shaders don't have a default precision so we need
        // to pick one. mediump is a good default. It means "medium precision"
        precision mediump float;

        // we need to declare an output for the fragment shader
        layout (location = 0) out vec4 outColor0; // 出力先の指定
        layout (location = 1) out vec4 outColor1; // 出力先の指定
        layout (location = 2) out vec4 outColor2; // 出力先の指定
        layout (location = 3) out vec4 outColor3; // 出力先の指定

        void main() {
          // Just set the output to a constant redish-purple
          outColor0 = vec4(1, 0, 0, 1);
          outColor1 = vec4(1, 1, 0, 1);
          outColor2 = vec4(1, 0, 1, 1);
          outColor3 = vec4(0, 0, 1, 1);
        }`
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