function transform(position, scale, rotation) {

    this.position = position || new Float32Array([0, 0, 0]);
    this.scale = scale || new Float32Array([1, 1, 1]);
    this.rotation = rotation || new Float32Array([0, 0, 0]);
    this.up = [0, 1, 0];
    this.right = [1, 0, 0];
    this.forward = [0, 0, -1];


    this.needsUpdate = false;
    this.modelMatrix = new m4_identity();
    this.viewMatrix = new m4_identity();
    this.projectionMatrix = new m4_identity();

    //new m4_perspective(this.fov, this.aspect, this.near, this.far);
    //new m4_view(this.transform.modelMatrix);
    return this;
}