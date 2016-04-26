// Interaction
var drawStyle;

var userRotationMatrix = mat4.create();
mat4.identity(userRotationMatrix);

var camX = 0;
var camZ = -30;
var camHeight = 0;

function drawScene() {
    gl.viewport(0, 0, gl.viewportWidth, gl.viewportHeight);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    mat4.perspective(45, gl.viewportWidth / gl.viewportHeight, 0.1, 100.0, pMatrix);
    mat4.identity(mvMatrix);

    mat4.rotate(mvMatrix, -camHeight, [1, 0, 0]);

    // Skybox
    gl.disable(gl.DEPTH_TEST);
    myWorldBackground.draw();
    gl.enable(gl.DEPTH_TEST);

    mat4.translate(mvMatrix, [camX, 0.0, camZ]);

    sun.draw();
}

var lastTime = 0;

function animate() {
    var timeNow = new Date().getTime();
    var elapsed = 0;
    if (isTurning) {
        if (lastTime != 0) {
            elapsed = speedOfRotation * (timeNow - lastTime);
        }
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

    var canvas = document.getElementById("lesson03-canvas");

    initGL(canvas);
    initShaders();
    initTextures();
    sun = initWorldObjects();

    gl.clearColor(0.0, 0.0, 0.0, 1.0);

    gl.enable(gl.DEPTH_TEST);

    // Interactions
    canvas.onmousedown = handleMouseDown;
    document.onmouseup = handleMouseUp;
    document.onmousemove = handleMouseMove;
    canvas.onmousewheel = handleWheel;
    window.addEventListener("keydown", handleKeyDown, false);
    drawStyle = gl.TRIANGLES;
    tick();
}

