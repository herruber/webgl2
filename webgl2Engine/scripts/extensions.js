
Array.prototype.each = function (fn) {

    for (var i = 0; i < this.length; i++) {
        fn(this[i], i);
    }
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