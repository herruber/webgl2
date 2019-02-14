
function xmlToJson(xml) {
    'use strict';
    // Create the return object
    var obj = {}, i, j, attribute, item, nodeName, old;

    if (xml.nodeType === 1) { // element
        // do attributes
        if (xml.attributes.length > 0) {
            obj["@attributes"] = {};
            for (j = 0; j < xml.attributes.length; j = j + 1) {
                attribute = xml.attributes.item(j);
                obj["@attributes"][attribute.nodeName] = attribute.nodeValue;
            }
        }
    } else if (xml.nodeType === 3) { // text
        obj = xml.nodeValue;
    }

    // do children
    if (xml.hasChildNodes()) {
        for (i = 0; i < xml.childNodes.length; i = i + 1) {
            item = xml.childNodes.item(i);
            nodeName = item.nodeName;
            if ((obj[nodeName]) === undefined) {
                obj[nodeName] = xmlToJson(item);
            } else {
                if ((obj[nodeName].push) === undefined) {
                    old = obj[nodeName];
                    obj[nodeName] = [];
                    obj[nodeName].push(old);
                }
                obj[nodeName].push(xmlToJson(item));
            }
        }
    }
    return obj;
};

Array.prototype.each = function (fn) {

    for (var i = 0; i < this.length; i++) {
        fn(this[i], i);
    }
}


Float32Array.prototype.x = function () {
    return this[0];
    debugger;
}

Float32Array.prototype.y = function () {
    return this[1];
}

Float32Array.prototype.z = function () {
    return this[2];
}

Float32Array.prototype.w = function () {
    return this[3];
}

Float32Array.prototype.r = function () {
    return this[0];
}

Float32Array.prototype.g = function () {
    return this[1];
}

Float32Array.prototype.b = function () {
    return this[2];
}

Float32Array.prototype.a = function () {
    return this[3];
}

Float32Array.prototype.first = function () {
    return this[0];
}

Float32Array.prototype.last = function () {
    return this[this.length - 1];
}

////////

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

    if (!b.length) {
        for (var i = 0; i < a.length; i++) {

                result.push(a[i] * b);

        }

    }
    else {
        for (var i = 0; i < a.length; i++) {

            if (isNaN(b[i])) {
                result.push(a[i]);
            }
            else {
                result.push(a[i] * b[i]);
            }

        }

    }
 
    return result;

}

function div(a, b) {



    var base = baseMath(a, b);

    var result = [];

    if (!b.length) {
        for (var i = 0; i < a.length; i++) {

            result.push(a[i] / b);

        }

    }
    else {

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
    }
    return result;

}

function add(a, b) {

    var result = [];
    if (!b.length) {
        for (var i = 0; i < a.length; i++) {

            result.push(a[i] + b);

        }

    }
    else {
        for (var i = 0; i < a.length; i++) {

            if (isNaN(b[i])) {
                result.push(a[i]);
            }
            else {
                result.push(a[i] + b[i]);
            }

        }
    }

    return result;

}

function sub(a, b) {

    var result = [];
    if (!b.length) {
        for (var i = 0; i < a.length; i++) {

            result.push(a[i] - b);

        }

    }
    else {
        for (var i = 0; i < a.length; i++) {

            if (isNaN(b[i])) {
                result.push(a[i]);
            }
            else {
                result.push(a[i] - b[i]);
            }

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

    // Quaternion math

    var q = q_fromEuler(transform.rotation);
    var v = transform.position;
    var s = transform.scale;
    var out = new m4_identity();


    var x = q[0], y = q[1], z = q[2], w = q[3];

    var x2 = x + x;

    var y2 = y + y;

    var z2 = z + z;

    var xx = x * x2;

    var xy = x * y2;

    var xz = x * z2;

    var yy = y * y2;

    var yz = y * z2;

    var zz = z * z2;

    var wx = w * x2;

    var wy = w * y2;

    var wz = w * z2;

    var sx = s[0];

    var sy = s[1];

    var sz = s[2];

    out[0] = (1 - (yy + zz)) * sx;

    out[1] = (xy + wz) * sx;

    out[2] = (xz - wy) * sx;

    out[3] = 0;

    out[4] = (xy - wz) * sy;

    out[5] = (1 - (xx + zz)) * sy;

    out[6] = (yz + wx) * sy;

    out[7] = 0;

    out[8] = (xz + wy) * sz;

    out[9] = (yz - wx) * sz;

    out[10] = (1 - (xx + yy)) * sz;

    out[11] = 0;

    out[12] = v[0];

    out[13] = v[1];

    out[14] = v[2];

    out[15] = 1;

    return out;

}

function m4_inverse(a) {

    var out = new m4_identity();
    var a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3];

    var a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7];

    var a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11];

    var a30 = a[12], a31 = a[13], a32 = a[14], a33 = a[15];

    var b00 = a00 * a11 - a01 * a10;

    var b01 = a00 * a12 - a02 * a10;

    var b02 = a00 * a13 - a03 * a10;

    var b03 = a01 * a12 - a02 * a11;

    var b04 = a01 * a13 - a03 * a11;

    var b05 = a02 * a13 - a03 * a12;

    var b06 = a20 * a31 - a21 * a30;

    var b07 = a20 * a32 - a22 * a30;

    var b08 = a20 * a33 - a23 * a30;

    var b09 = a21 * a32 - a22 * a31;

    var b10 = a21 * a33 - a23 * a31;

    var b11 = a22 * a33 - a23 * a32;

    // Calculate the determinant

    var det = b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;

    if (!det) {

        return null;

    }

    det = 1.0 / det;

    out[0] = (a11 * b11 - a12 * b10 + a13 * b09) * det;

    out[1] = (a02 * b10 - a01 * b11 - a03 * b09) * det;

    out[2] = (a31 * b05 - a32 * b04 + a33 * b03) * det;

    out[3] = (a22 * b04 - a21 * b05 - a23 * b03) * det;

    out[4] = (a12 * b08 - a10 * b11 - a13 * b07) * det;

    out[5] = (a00 * b11 - a02 * b08 + a03 * b07) * det;

    out[6] = (a32 * b02 - a30 * b05 - a33 * b01) * det;

    out[7] = (a20 * b05 - a22 * b02 + a23 * b01) * det;

    out[8] = (a10 * b10 - a11 * b08 + a13 * b06) * det;

    out[9] = (a01 * b08 - a00 * b10 - a03 * b06) * det;

    out[10] = (a30 * b04 - a31 * b02 + a33 * b00) * det;

    out[11] = (a21 * b02 - a20 * b04 - a23 * b00) * det;

    out[12] = (a11 * b07 - a10 * b09 - a12 * b06) * det;

    out[13] = (a00 * b09 - a01 * b07 + a02 * b06) * det;

    out[14] = (a31 * b01 - a30 * b03 - a32 * b00) * det;

    out[15] = (a20 * b03 - a21 * b01 + a22 * b00) * det;

    return out;

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

    var f = 1.0 / Math.tan(fovy / 2);
    var nf = f;


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

function rotateX(point, origin, degrees) {

    var a = point;
    var b = origin;
    var c = Math.PI * degrees / 180

    var out = [0, 0, 0];
    var p = [], r = [];

    //Translate point to the origin

    p[0] = a[0] - b[0];

    p[1] = a[1] - b[1];

    p[2] = a[2] - b[2];

    //perform rotation

    r[0] = p[0];

    r[1] = p[1] * Math.cos(c) - p[2] * Math.sin(c);

    r[2] = p[1] * Math.sin(c) + p[2] * Math.cos(c);

    //translate to correct position

    out[0] = r[0] + b[0];

    out[1] = r[1] + b[1];

    out[2] = r[2] + b[2];

    return out;

}

function rotateY(point, origin, degrees) {
    var a = point;
    var b = origin;
    var c = Math.PI * degrees / 180

    var out = [0, 0, 0];
    var p = [], r = [];

    //Translate point to the origin

    p[0] = a[0] - b[0];

    p[1] = a[1] - b[1];

    p[2] = a[2] - b[2];

    //perform rotation

    r[0] = p[2] * Math.sin(c) + p[0] * Math.cos(c);

    r[1] = p[1];

    r[2] = p[2] * Math.cos(c) - p[0] * Math.sin(c);

    //translate to correct position

    out[0] = r[0] + b[0];

    out[1] = r[1] + b[1];

    out[2] = r[2] + b[2];

    return out;

}

function rotateZ(point, origin, degrees) {

    var a = point;
    var b = origin;
    var c = Math.PI * degrees / 180

    var out = [0, 0, 0];
    var p = [], r = [];

    //Translate point to the origin

    p[0] = a[0] - b[0];

    p[1] = a[1] - b[1];

    p[2] = a[2] - b[2];

    //perform rotation

    r[0] = p[0] * Math.cos(c) - p[1] * Math.sin(c);

    r[1] = p[0] * Math.sin(c) + p[1] * Math.cos(c);

    r[2] = p[2];

    //translate to correct position

    out[0] = r[0] + b[0];

    out[1] = r[1] + b[1];

    out[2] = r[2] + b[2];

    return out;

}

function rotate(point, origin, degrees) {

    var out = [0, 0, 0];

    out = rotateX(point, origin, degrees[0]);
    out = rotateX(out, origin, degrees[1]);
    out = rotateX(out, origin, degrees[2]);

    return out;

}

function degToRad(deg) {
    return Math.PI * deg / 180;
}

function directionsFromViewMatrix(a) {

    var out = {
        forward: normalize([a[2], a[6], a[10]]),
        right: normalize([a[0], a[4], a[8]]),
        up: normalize([a[1], a[5], a[9]])
    }

    out.right.invert();

    return out;
    

}

Array.prototype.invert = function () {

    for (var i = 0; i < this.length; i++) {
        this[i] *= -1;
    }
}

function setTransformDirections(transform) {

    var result = directionsFromViewMatrix(transform.viewMatrix);

    transform.forward = mul(result.forward, -1);
    transform.right =  result.right;
    transform.up = result.up;

}

function cross(a, b) {
    var out = [0, 0, 0];
    var ax = a[0], ay = a[1], az = a[2];

    var bx = b[0], by = b[1], bz = b[2];

    out[0] = ay * bz - az * by;

    out[1] = az * bx - ax * bz;

    out[2] = ax * by - ay * bx;

    return out;

}

function _get(url, fn) {

    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
           
            if (fn) fn(this.responseXML);

        }
    };

   
    xhttp.open("GET", url, true);
    xhttp.send();

}

String.prototype.getFileName = function () {

    return this.split("/").last().split(".").first();


}