var objectCache = {
    count: 0,
    current: 0,
    required: [],
    check: function(){

        if (this.required.length > 0) {

            for (var i = 0; i < this.required.length; i++) {

                var prop = this.required[i];

                if (!this.objects[prop]) return;

            }

        }
        else if (this.current !== this.count) return;

        appLoader.start();
    },

    objects: {}
}


var appLoader = (function () {

    function start() {
        startup.run();
    }

    return {
        start: start
    }

}())