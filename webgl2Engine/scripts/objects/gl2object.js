function gl2object(name, transform) {

    this.type = "gl2object";
    this.name = name || "";
    this.meshes = [];
    this.transform = transform || new transform();
    this.visible = true;
    return this;
}

function createBuffer(array) {
    // Create an empty buffer object to store the vertex buffer
    var buffer = gl.createBuffer();

    //Bind appropriate array buffer to it
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);

    // Pass the vertex data to the buffer
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(array), gl.STATIC_DRAW);

    // Unbind the buffer
    gl.bindBuffer(gl.ARRAY_BUFFER, null);

    return buffer;

}

function gl2geometry(vertices, material, uvs, normals) {

    this.vertices = createBuffer(vertices);

    this.material = material;
    this.visible = true;

    return this;


}

function gl2mesh(name, geometries) {

    this.visible = true;
    this.cube = function () {

        var arr = [
       // Front face
       -1.0, -1.0, 1.0,
        1.0, -1.0, 1.0,
        1.0, 1.0, 1.0,
       -1.0, 1.0, 1.0,

       // Back face
       -1.0, -1.0, -1.0,
       -1.0, 1.0, -1.0,
        1.0, 1.0, -1.0,
        1.0, -1.0, -1.0,

       // Top face
       -1.0, 1.0, -1.0,
       -1.0, 1.0, 1.0,
        1.0, 1.0, 1.0,
        1.0, 1.0, -1.0,

       // Bottom face
       -1.0, -1.0, -1.0,
        1.0, -1.0, -1.0,
        1.0, -1.0, 1.0,
       -1.0, -1.0, 1.0,

       // Right face
        1.0, -1.0, -1.0,
        1.0, 1.0, -1.0,
        1.0, 1.0, 1.0,
        1.0, -1.0, 1.0,

       // Left face
       -1.0, -1.0, -1.0,
       -1.0, -1.0, 1.0,
       -1.0, 1.0, 1.0,
       -1.0, 1.0, -1.0,
        ]

        this.geometries = [new gl2geometry(arr, new gl2material("basic", shaders.basic))]
        this.name = "cube";
        return this;
    }

    this.plane = function () {
        var arr = [
   // Front face
   -1.0, -1.0, 0.0,
    1.0, -1.0, 0.0,
    1.0, 1.0, 0.0,

    1.0, 1.0, 0.0,
    -1.0, 1.0, 0.0,
   -1.0, -1.0, 0.0
        ]

        this.geometries = [new gl2geometry(arr, new gl2material("basic", shaders.basic))]
        this.name = "cube";
        return this;
    }

    Object.create(gl2object);
    this.geometries = geometries || [];
    this.name = name || "";

    return this;
}

