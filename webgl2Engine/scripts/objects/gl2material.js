
function createProgram(shader) {
    // create a program.
    var vertexShader = shader.vertex;
    var fragmentShader = shader.fragment;
    var program = gl.createProgram();
 
    // attach the shaders.
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
 
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

function getUniformLocations(program, shader) {

    var uni = {};
    debugger;
    for (var u in shader.uniforms) {
        shader.uniforms[u].location = gl.getUniformLocation(program, u); // { name: u, location: gl.getUniformLocation(program, u), value: 0 };
    }

    return shader.uniforms;
}

function gl2material(name, shader) {

    this.program = createProgram(shader);
    this.uniforms = getUniformLocations(this.program, shader);
    this.name = name || "";
    return this;
}