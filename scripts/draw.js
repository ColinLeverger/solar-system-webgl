var drawStyle;

var userRotationMatrix = mat4.create();
mat4.identity(userRotationMatrix);

// CAMERAS DEFINITIONS
var camera; // active camera
var camera1;
var camera2;
var camera3;

function drawScene() {
    gl.viewport(0, 0, gl.viewportWidth, gl.viewportHeight);
    // Reset parameters of the previous draw
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.clear(gl.DEPTH_BUFFER_BIT);

    mat4.perspective(45, gl.viewportWidth / gl.viewportHeight, 0.1, 100.0, pMatrix);
    mat4.identity(mvMatrix);

    camera.update();

    sun.draw(); // Draw the sun and all its children
}

var lastTime = 0;
function animate() {
    var timeNow = new Date().getTime();
    var elapsed = 0;
    if (isTurning) { // Don't try to animate if the user has stop the system rotation
            elapsed = speedOfRotation * (timeNow - lastTime);
    }
    sun.animate(elapsed);
    lastTime = timeNow;
}

function tick() {
    requestAnimFrame(tick);
    drawScene();
    animate();
}

function webGLStart() {
    var canvas = document.getElementById("solarsystem-canvas");

    camera = initCameras();
    initGL(canvas);
    initShaders();
    initTextures();
    sun = initWorldObjects();

    // Interactions management
    canvas.onmousedown = handleMouseDown;
    document.onmouseup = handleMouseUp;
    document.onmousemove = handleMouseMove;
    canvas.onmousewheel = handleWheel;
    window.addEventListener("keydown", handleKeyDown, false);

    drawStyle = gl.TRIANGLES;
    tick(); // Everything is ready so display and start to animate !
}

function initCameras() {
    // Stics cameras
    camera1 = new camera(null, 0, 0, -30, 0, 0);
    camera2 = new camera(null, 0, 0, +30, 180, 0);
    camera3 = new camera(null, 0, 30, 0, 0, -90);

    return camera1; // Default one
}

