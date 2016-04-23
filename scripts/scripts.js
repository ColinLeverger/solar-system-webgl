// Interaction
var drawStyle;

var userRotationMatrix = mat4.create();
mat4.identity(userRotationMatrix);

// Textures
var sunTexture;
var earthTexture;
var moonTexture;
var jupiterTexture;

function initTexture() {
    sunTexture = gl.createTexture();
    sunTexture.image = new Image();
    sunTexture.image.onload = function () {
        handleLoadedTexture(sunTexture)
    };
    sunTexture.image.src = "./img/sun.jpg"; // note : croos origin problem with chrome outside webserver

    earthTexture = gl.createTexture();
    earthTexture.image = new Image();
    earthTexture.image.onload = function () {
        handleLoadedTexture(earthTexture)
    };
    earthTexture.image.src = "./img/earth.jpg";

    moonTexture = gl.createTexture();
    moonTexture.image = new Image();
    moonTexture.image.onload = function () {
        handleLoadedTexture(moonTexture)
    };
    moonTexture.image.src = "./img/moon.gif";

    jupiterTexture = gl.createTexture();
    jupiterTexture.image = new Image();
    jupiterTexture.image.onload = function () {
        handleLoadedTexture(jupiterTexture)
    };
    jupiterTexture.image.src = "./img/jupiter.jpg";
}

function handleLoadedTexture(texture) {
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, texture.image);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_NEAREST);
    gl.generateMipmap(gl.TEXTURE_2D);
    gl.bindTexture(gl.TEXTURE_2D, null);
}


function degToRad(degrees) {
    return degrees * Math.PI / 180;
}

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
    objects.push(earth);
    earth.translate([0, 0, 4]);

    var moon = new sphere(earth, 0.05);
    moon.texture = moonTexture;
    objects.push(moon);
    moon.translate([0, 0, 0.2]);

    var jupiter = new sphere(rootObject, 0.3);
    jupiter.texture = jupiterTexture;
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

