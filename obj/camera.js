// =============
// CAMERA OBJECT
// =============

camera.prototype = new worldObject;
// Constructor
function camera(parent, x, y, z, direction, height) {
    this.base = worldObject;
    this.parent = parent;
    this.x = x;
    this.y = y;
    this.z = z;
    this.canMove = true;
    this.height = degToRad(height);
    this.direction = degToRad(direction);
    return this;
}

// When moving the camera
camera.prototype.update = function () {
    mat4.rotate(mvMatrix, this.height, [ 1, 0, 0 ]);
    mat4.rotate(mvMatrix, this.direction, [ 0, 1, 0 ]);
    if ( mouseControl ) {
        mat4.multiply(mvMatrix, userRotationMatrix);
    }
    
    // Skybox
    gl.disable(gl.DEPTH_TEST);
    myWorldBackground.draw();
    gl.enable(gl.DEPTH_TEST);
    
    mat4.translate(mvMatrix, [ this.x, this.y, this.z ]);
}