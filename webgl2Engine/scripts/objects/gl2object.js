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
  
    if (geometries && !geometries.length) {

        geometries = [geometries];
    }

    Object.create(gl2object);
    this.geometries = geometries || [];
    this.name = name || "";

    return this;
}

function gl2plane(size, material) {

    var x = size[0] / 2;
    var y = size[1] / 2;
    var z = size[2] / 2;

      var arr = [
        // Front face
        -x, -y, 0.0,
        x, -y, 0.0,
        x, y, 0.0,

        x, y, 0.0,
        -x, y, 0.0,
        -x, -y, 0.0
        ]

      var geometry = new gl2geometry(arr, material || new gl2material("basic", shaders.basic))

    return geometry;
}
