camera.prototype = new worldObject;
function camera(parent,x,y,z) {
    this.base = worldObject;
    this.parent = parent;
    this.x = x;
    this.y = y;
    this.z = z;
    this.height = 0;
    this.direction = 0;
    return this;
}

camera.prototype.draw = function () {
    mat4.multiply(mvMatrix, this.rotationTransformation);

    setMatrixUniforms();

    //draws children
    for (var i = 0; i < this.children.length; i++) {
        this.children[i].draw();
    }
};

camera.prototype.animate = function (elapsedTime) {
    //animate children
    for (var i = 0; i < this.children.length; i++) {
        this.children[i].animate();
    }
};