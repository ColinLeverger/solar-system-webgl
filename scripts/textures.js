// Load every texture into a specific variable
var sunTexture;
var earthTexture;
var moonTexture;
var jupiterTexture;
var marsTexture;
var worldTexture;
var mercureTexture;
var venusTexture;
var saturneTexture;

// Load and initialise the texture for each known objects
function initTextures() {
    sunTexture = gl.createTexture();
    sunTexture.image = new Image();
    sunTexture.image.onload = function () {
        handleLoadedTexture(sunTexture)
    };
    sunTexture.image.src = "./img/sun.jpg";
    
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
    moonTexture.image.src = "./img/moon.jpg";
    
    saturneTexture = gl.createTexture();
    saturneTexture.image = new Image();
    saturneTexture.image.onload = function () {
        handleLoadedTexture(saturneTexture)
    };
    saturneTexture.image.src = "./img/saturne.png";
    
    jupiterTexture = gl.createTexture();
    jupiterTexture.image = new Image();
    jupiterTexture.image.onload = function () {
        handleLoadedTexture(jupiterTexture)
    };
    jupiterTexture.image.src = "./img/jupiter.jpg";
    
    marsTexture = gl.createTexture();
    marsTexture.image = new Image();
    marsTexture.image.onload = function () {
        handleLoadedTexture(marsTexture)
    };
    marsTexture.image.src = "./img/mars.jpg";
    
    mercureTexture = gl.createTexture();
    mercureTexture.image = new Image();
    mercureTexture.image.onload = function () {
        handleLoadedTexture(mercureTexture)
    };
    mercureTexture.image.src = "./img/mercure.jpg";
    
    venusTexture = gl.createTexture();
    venusTexture.image = new Image();
    venusTexture.image.onload = function () {
        handleLoadedTexture(venusTexture)
    };
    venusTexture.image.src = "./img/venus.jpg";
    
    worldTexture = gl.createTexture();
    worldTexture.image = new Image();
    worldTexture.image.onload = function () {
        handleLoadedTexture(worldTexture)
    };
    worldTexture.image.src = "./img/stars.jpg";
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
