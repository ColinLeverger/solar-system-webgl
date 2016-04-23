// Interaction
var drawStyle;

var userRotationMatrix = mat4.create();
mat4.identity(userRotationMatrix);

var camX = 0;
var camZ = -15;
var camHeight = 0;

function drawScene() {
    gl.viewport(0, 0, gl.viewportWidth, gl.viewportHeight);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    mat4.perspective(45, gl.viewportWidth / gl.viewportHeight, 0.1, 100.0, pMatrix);
    mat4.identity(mvMatrix);

    mat4.rotate(mvMatrix, -camHeight, [1, 0, 0]);

    mat4.translate(mvMatrix, [camX, 0.0, camZ]);

    rootObject.draw();
}

// World
var objects = [];
var rootObject;

function initWorldObjects() {

    rootObject = new sphere(null, 1);
    rootObject.texture = sunTexture;
    objects.push(rootObject);

    var earth = new sphere(rootObject, 0.1);
    earth.texture = earthTexture;
    earth.rotSpeed = 0.0005;
    earth.rotationDirection = 1;
    objects.push(earth);
    earth.translate([0, 0, 4]);

    var moon = new sphere(earth, 0.05);
    moon.texture = moonTexture;
    moon.rotationDirection = 1;
    objects.push(moon);
    moon.translate([0, 0, 0.2]);

    var jupiter = new sphere(rootObject, 0.3);
    jupiter.texture = jupiterTexture;
    jupiter.rotSpeed = 0.0002;
    jupiter.rotationDirection = -1;
    objects.push(jupiter);
    jupiter.translate([0, 0, 6]);

    return rootObject;
}

var lastTime = 0;

function animate() {
    var timeNow = new Date().getTime();
    var elapsed = 0;
    if (lastTime != 0) {
        elapsed = timeNow - lastTime;
    }
    rootObject.animate(elapsed);
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
    initTexture();
    rootObject = initWorldObjects();


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

