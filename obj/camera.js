camera.prototype = new worldObject;
function camera(parent,x,y,z,direction,height) {
    this.base = worldObject;
    this.parent = parent;
    this.x = x;
    this.y = y;
    this.z = z;
    this.height = degToRad(height);
    this.direction = degToRad(direction);
    return this;
}