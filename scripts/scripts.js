// Interaction
var drawStyle;

var userRotationMatrix = mat4.create();
mat4.identity(userRotationMatrix);

// Textures
var sunTexture;
var earthTexture;
var moonTexture;

function initTexture() {
    sunTexture = gl.createTexture();
    sunTexture.image = new Image();
    sunTexture.image.onload = function () {
        handleLoadedTexture(sunTexture)
    }
    sunTexture.image.src = "./img/sun.jpg"; // note : croos origin problem with chrome outside webserver

    earthTexture = gl.createTexture();
    earthTexture.image = new Image();
    earthTexture.image.onload = function () {
        handleLoadedTexture(earthTexture)
    }
    earthTexture.image.src = "./img/earth.jpg";

    moonTexture = gl.createTexture();
    moonTexture.image = new Image();
    moonTexture.image.onload = function () {
        handleLoadedTexture(moonTexture)
    }
    moonTexture.image.src = "./img/moon.gif";
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


//INITGL

function degToRad(degrees) {
    return degrees * Math.PI / 180;
}

var camX = 0;
var camZ = -125;
var camHeight = 0;

function drawScene() {
    gl.viewport(0, 0, gl.viewportWidth, gl.viewportHeight);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    mat4.perspective(45, gl.viewportWidth / gl.viewportHeight, 0.1, 200.0, pMatrix);
    mat4.identity(mvMatrix);

    mat4.rotate(mvMatrix, -camHeight, [1, 0, 0]);

    mat4.translate(mvMatrix, [camX, 0.0, camZ]);

    rootObject.draw();
}

// World
var objects = [];
var rootObject;

function initWorldObjects() {
    var obj = 12;

    rootObject = new sphere(null,10);
    rootObject.texture = sunTexture;
    objects.push(rootObject);

    var earth = new sphere(rootObject,2);
    earth.texture = earthTexture;
    objects.push(earth);
    earth.translate([0, 0, 40]);

    var moon = new sphere(earth,1);
    moon.texture = moonTexture;
    objects.push(moon);
    moon.translate([0, 0, 5]);

    return rootObject;
}

var rTri = 0;
var rSquare = 0;
var rSphere = 0;
var lastTime = 0;

function animate() {
    var timeNow = new Date().getTime();
    var elapsed = 0;
    if (lastTime != 0) {
        elapsed = timeNow - lastTime;

        rTri += (90 * elapsed) / 1000.0;
        rSquare += (75 * elapsed) / 1000.0;
        rSphere += (50 * elapsed) / 1000.0;
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
    initShaders()
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

