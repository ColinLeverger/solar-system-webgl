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

    sun.draw();
}

// World
var objects = [];
var sun;

function initWorldObjects() {
    sun = new sphere(null, 1);
    sun.texture = sunTexture;
    sun.selfRotationSpeed = 0.0001;
    objects.push(sun);

    var earth = new sphere(sun, 0.1);
    earth.texture = earthTexture;
    earth.rotationDirection = 1;
    earth.rotationSpeed = 0.001;
    earth.selfRotationSpeed = 0.01;
    objects.push(earth);
    earth.translate([0, 0, 4]);

    var moon = new sphere(earth, 0.05);
    moon.texture = moonTexture;
    moon.rotationDirection = 1;
    moon.selfRotationSpeed = 0.05;
    moon.rotationSpeed = 0.01;
    objects.push(moon);
    moon.translate([0, 0, 0.2]);

    var jupiter = new sphere(sun, 0.3);
    jupiter.texture = jupiterTexture;
    jupiter.rotationDirection = -1;
    jupiter.selfRotationSpeed = 0.0001;
    jupiter.rotationSpeed = 0.0001;
    objects.push(jupiter);
    jupiter.translate([0, 0, 6]);

    return sun;
}

var lastTime = 0;

function animate() {
    var timeNow = new Date().getTime();
    var elapsed = 0;
    if (lastTime != 0) {
        elapsed = timeNow - lastTime;
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
    initTexture();
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

