
Array.prototype.each = function (fn) {

    for (var i = 0; i < this.length; i++) {
        fn(this[i], i);
    }
}


function vec(a, b, c, d) {

    this.vec3 = function () {
        this.value = new Float32Array([0, 0, 0])
        return this;
    }

    this.vec2 = function () {
        this.value = new Float32Array([0, 0])
        return this;
    }

    this.vec4 = function () {
        this.value = new Float32Array([0, 0, 0, 0])
        return this;
    }

    var buffer = [];

    if (a) {

        if (a.length) {

            a.each(function (nr) {
                buffer.push(nr);
            })
        }
        else {
            buffer.push(a);
        }

    }
    else {
        buffer.push(0, 0, 0, 0);
    }

    this.value = new Float32Array(buffer);
    this.x = this.value[0];
    this.y = this.value[1];
    this.z = this.value[2] || null;
    this.w = this.value[3] || null;


    return this;
}