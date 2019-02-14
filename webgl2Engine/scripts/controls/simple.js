

function simpleControls(canvas, camera) {
    this.canvas = canvas;
    this.camera = camera;
    this.rotateSpeed = 1.5;
    this.moveSpeed = 0.25;

    this.keyDown = function (event) {

        var v = [0, 0, 0];

        switch (event.key) {
            case "ArrowRight":
                this.camera.transform.position = sub(this.camera.transform.position, mul(this.camera.transform.right, this.moveSpeed))
                break;
            case "ArrowLeft":
                this.camera.transform.position = add(this.camera.transform.position, mul(this.camera.transform.right, this.moveSpeed))
                break;
            case "ArrowUp":
                this.camera.transform.position = add(this.camera.transform.position, mul(this.camera.transform.forward, this.moveSpeed))
                break;
            case "ArrowDown":
                this.camera.transform.position = sub(this.camera.transform.position, mul(this.camera.transform.forward, this.moveSpeed))
                break;
            default:
        }

    }

    this.rotate = function (dir) {

        this.camera.transform.rotation[1] -= dir[0] * this.rotateSpeed;
        this.camera.transform.rotation[0] -= dir[1] * this.rotateSpeed;

    }

    return this;
}