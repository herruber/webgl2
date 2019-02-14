
function clone(obj) {
    if (!obj) return;
    var string = JSON.stringify(obj);

    return JSON.parse(string);

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

function gl2camera(fovy, aspect, near, far) {
    this.name = "";
    this.type = "gl2camera";
    this.fov = fovy || 65;
    this.aspect = aspect || 0.5;
    this.near = near || 0.1;
    this.far = far || 100;


    this.transform = new transform();

    return this;
}

function gl2object(name, transform) {

    this.type = "gl2object";
    this.name = name || "";
    this.meshes = [];
    this.transform = transform || new transform();
    this.visible = true;
    return this;
}

function gl2geometry(vertices, material, uvs, normals) {

    this.vertices = vertices ? createBuffer(vertices) : null;
    this.vertexCount = vertices ? vertices.length / 3 : 0;
    this.uvs = uvs ? createBuffer(uvs) : null;
    this.material = material || new gl2material("basic", shaders.basic);
    this.visible = true;

    this.set = function (vertices, uvs, normals) {
        debugger;
        this.vertices = createBuffer(vertices) || this.vertices;
        this.vertexCount = vertices ? vertices.length / 3 : 0;
        this.uvs = createBuffer(uvs) || this.uvs;
    }

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

      var uvs = [
          0, 0,
          1, 0,
          1, 1,

          1, 1,
          0, 1,
          0, 0

      ]

      var geometry = new gl2geometry(arr, material || new gl2material("basic", shaders.basic), uvs)
     
    return geometry;
}

function gl2box(name, size, transform) {

    var box = clone(objectCache.objects.untitled);

    var verts = box.meshes.first().geometries.first().vertices;

    for (var i = 0; i < verts.length; i++) {

        debugger;

    }


}