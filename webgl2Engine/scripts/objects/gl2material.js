
function createProgram(shader) {
    // create a program.
    var vertexShader = shader.vertex;
    var fragmentShader = shader.fragment;
    var program = gl.createProgram();
 
    // attach the shaders.
    gl.attachShader(program, compileShader(vertexShader, gl.VERTEX_SHADER));
    gl.attachShader(program, compileShader(fragmentShader, gl.FRAGMENT_SHADER));
 
    // link the program.
    gl.linkProgram(program);
 
    // Check if it linked.
    var success = gl.getProgramParameter(program, gl.LINK_STATUS);
    if (!success) {
        // something went wrong with the link
        throw ("program filed to link:" + gl.getProgramInfoLog (program));
    }
 
    return program;
}

function gl2material(name, shader) {



    this.program = createProgram(shader);
    this.name = name || "";
    return this;
}