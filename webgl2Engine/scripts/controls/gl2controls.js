var gl2controls = {

   controls: null,

   axes: {
        screen: {
            dir: [0, 0],
            old: [0, 0],
            position: [0, 0]
        },
        world:{
            dir: [0, 0, 0],
            old: [0, 0, 0],
            position: [0, 0, 0]
        },

        fromEvent: function (event) {
            this.screen.position = [event.clientX, event.clientY];
           
            this.screen.dir = normalize(sub(this.screen.position, this.screen.old));
            console.log(this.screen.dir)
            this.screen.old = this.screen.position;
        }
    }

}