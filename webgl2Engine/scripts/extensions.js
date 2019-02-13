
Array.prototype.each = function (fn) {

    for (var i = 0; i < this.length; i++) {
        fn(this[i], i);
    }
}

Array.prototype.x = function () {
    return this[0];
}

Array.prototype.y = function () {
    return this[1];
}

Array.prototype.z = function () {
    return this[2];
}

Array.prototype.w = function () {
    return this[3];
}

Array.prototype.r = function () {
    return this[0];
}

Array.prototype.g = function () {
    return this[1];
}

Array.prototype.b = function () {
    return this[2];
}

Array.prototype.a = function () {
    return this[3];
}

Array.prototype.first = function () {
    return this[0];
}

Array.prototype.last = function () {
    return this[this.length - 1];
}

Number.prototype.frac = function () {

    return Math.abs(this - Math.floor(this));

}

function baseMath(a, b) {
    var smallest;
    var largest;

    if (a.length <= b.length) {
        smallest = a;
        largest = b;
    }
    else {
        smallest = b;
        largest = a;
    }

    return {largest: largest, smallest: smallest}
}

function mul(a, b) {

    var result = [];

    for (var i = 0; i < a.length; i++) {

        if(isNaN(b[i])){
            result.push(a[i]);
        }
        else {
            result.push(a[i] * b[i]);
        }

    }
    
    return result;

}

function div(a, b) {



    var base = baseMath(a, b);

    var result = [];

    for (var i = 0; i < a.length; i++) {

        if (b[i] === 0) {
            console.error("Division by zero");
            return;
        }

        if (isNaN(b[i])) {
            result.push(a[i]);
        }
        else {
            result.push(a[i] / b[i]);
        }

    }

    return result;

}

function add(a, b) {

    var result = [];

    for (var i = 0; i < a.length; i++) {

        if (isNaN(b[i])) {
            result.push(a[i]);
        }
        else {
            result.push(a[i] + b[i]);
        }

    }

    return result;

}

function sub(a, b) {

    var result = [];

    for (var i = 0; i < a.length; i++) {

        if (isNaN(b[i])) {
            result.push(a[i]);
        }
        else {
            result.push(a[i] - b[i]);
        }

    }

    return result;

}

function length(a) {

    var result = 0;

    for (var i = 0; i < a.length; i++) {

        result += a[i] * a[i];

    }

    return Math.sqrt(result);

}

function normalize(a) {

    var l = length(a);
    var result = [];
    for (var i = 0; i < a.length; i++) {

        result.push(a[i] / l);
    }

    return result;
}

function distance(a, b) {

    var result = 0;

    for (var i = 0; i < a.length; i++) {

        if (isNaN(b[i])) {

        }
        else {
            result += Math.pow(a[i] - b[i], 2);
        }

    }

    return Math.sqrt(result);


}

function floor(a) {

    var result = [];

    for (var i = 0; i < a.length; i++) {

       result.push(Math.floor(a[i]))

    }

    return result;
}

function round(a) {

    var result = [];

    for (var i = 0; i < a.length; i++) {

        result.push(Math.round(a[i]))

    }

    return result;
}

function ceil(a) {

    var result = [];

    for (var i = 0; i < a.length; i++) {

        result.push(Math.ceil(a[i]))

    }

    return result;
}

function m4_mul(a, b) {

    var out = new m4_identity();

    var a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3];

    var a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7];

    var a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11];

    var a30 = a[12], a31 = a[13], a32 = a[14], a33 = a[15];

    // Cache only the current line of the second matrix

    var b0 = b[0], b1 = b[1], b2 = b[2], b3 = b[3];

    out[0] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;

    out[1] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;

    out[2] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;

    out[3] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;

    b0 = b[4]; b1 = b[5]; b2 = b[6]; b3 = b[7];

    out[4] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;

    out[5] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;

    out[6] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;

    out[7] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;

    b0 = b[8]; b1 = b[9]; b2 = b[10]; b3 = b[11];

    out[8] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;

    out[9] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;

    out[10] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;

    out[11] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;

    b0 = b[12]; b1 = b[13]; b2 = b[14]; b3 = b[15];

    out[12] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;

    out[13] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;

    out[14] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;

    out[15] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;

    return out;

}

function q_fromEuler(euler) {

    var x = euler[0];
    var y = euler[1];
    var z = euler[2];

    var out = [0, 0, 0, 1]

    var halfToRad = 0.5 * Math.PI / 180.0;

    x *= halfToRad;

    y *= halfToRad;

    z *= halfToRad;

    var sx = Math.sin(x);

    var cx = Math.cos(x);

    var sy = Math.sin(y);

    var cy = Math.cos(y);

    var sz = Math.sin(z);

    var cz = Math.cos(z);

    out[0] = sx * cy * cz - cx * sy * sz;

    out[1] = cx * sy * cz + sx * cy * sz;

    out[2] = cx * cy * sz - sx * sy * cz;

    out[3] = cx * cy * cz + sx * sy * sz;

    return out;

}

function m4_identity() {

    return [1, 0, 0, 0,
            0, 1, 0, 0,
            0, 0, 1, 0,
            0, 0, 0, 1];

}

function m4_fromQuat(q){

    var x = q[0], y = q[1], z = q[2], w = q[3];
    var out = new m4_identity();

    var x2 = x + x;

    var y2 = y + y;

    var z2 = z + z;

    var xx = x * x2;

    var yx = y * x2;

    var yy = y * y2;

    var zx = z * x2;

    var zy = z * y2;

    var zz = z * z2;

    var wx = w * x2;

    var wy = w * y2;

    var wz = w * z2;

    out[0] = 1 - yy - zz;

    out[1] = yx + wz;

    out[2] = zx - wy;

    out[3] = 0;

    out[4] = yx - wz;

    out[5] = 1 - xx - zz;

    out[6] = zy + wx;

    out[7] = 0;

    out[8] = zx + wy;

    out[9] = zy - wx;

    out[10] = 1 - xx - yy;

    out[11] = 0;

    out[12] = 0;

    out[13] = 0;

    out[14] = 0;

    out[15] = 1;

    return out;
}

function m4_transform(transform) {

    var pos = transform.position;
    var scale = transform.scale;
    var rotation = q_fromEuler(transform.rotation);

    var m4position =  [1, 0, 0, pos[0],
            0, 1, 0, pos[1],
            0, 0, 1, pos[2],
            0, 0, 0, 1];

    var m4scale = [scale.x || 1, 0, 0, 0,
                   0, scale.y || 1, 0, 0,
                   0, 0, scale.z || 1, 0,
                   0, 0, 0, 1             
    ];

    var m4rot = m4_fromQuat(rotation);

    var result = m4position;
    result = m4_mul(result, m4rot);
    result = m4_mul(result, m4scale);

    return new Float32Array(result);
}

function m4_view(transform) {

    var out = new m4_identity();

    out[0] = transform.right[0];
    out[4] = transform.right[1];
    out[8] = transform.right[2];

    out[1] = transform.up[0];
    out[5] = transform.up[1];
    out[9] = transform.up[2];

    out[2] = transform.forward[0];
    out[6] = transform.forward[1];
    out[10] = transform.forward[2];

    out[3] = transform.position[0];
    out[7] = transform.position[1];
    out[11] = transform.position[2];

    return out;
}

function m4_perspective(fovy, aspect, near, far) {
    var out = new m4_identity();

    fovy = (fovy / 180) * Math.PI;

    var f = 1.0 / Math.tan(fovy / 2), nf;

    out[0] = f / aspect;

    out[1] = 0;

    out[2] = 0;

    out[3] = 0;

    out[4] = 0;

    out[5] = f;

    out[6] = 0;

    out[7] = 0;

    out[8] = 0;

    out[9] = 0;

    out[11] = -1;

    out[12] = 0;

    out[13] = 0;

    out[15] = 0;

    if (far != null && far !== Infinity) {

        nf = 1 / (near - far);

        out[10] = (far + near) * nf;

        out[14] = (2 * far * near) * nf;

    } else {

        out[10] = -1;

        out[14] = -2 * near;

    }

    return out;

}

function m3_identity() {

    return [1, 0, 0,
            0, 1, 0,
            0, 0, 1];

}
