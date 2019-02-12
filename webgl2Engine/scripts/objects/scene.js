function scene() {

    this.children = [];
    this.active = [];

    this.setActive = function () {
        var self = this;
        self.active = [];

        this.children.each(function (obj) {
            debugger;
            if (obj.visible) self.active.push(obj);
        });

    }

    return this;
}