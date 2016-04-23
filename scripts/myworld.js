// World
var sun;

function initWorldObjects() {
    sun = new sphere(null);
    sun.texture = sunTexture;
    sun.selfRotationSpeed = 0.0001;

    var earth = new sphere(sun);
    earth.texture = earthTexture;
    earth.rotationDirection = 1;
    earth.rotationSpeed = 0.001;
    earth.selfRotationSpeed = 0.0005;
    earth.scale([0.1, 0.1, 0.1]);
    earth.translate([0, 0, 30]);

    var moon = new sphere(earth);
    moon.texture = moonTexture;
    moon.rotationDirection = 1;
    moon.selfRotationSpeed = 0.005;
    moon.rotationSpeed = 0.005;
    moon.scale([0.3, 0.3, 0.3]);
    moon.translate([0, 0, 7]);

    var jupiter = new sphere(sun);
    jupiter.texture = jupiterTexture;
    jupiter.rotationDirection = -1;
    jupiter.selfRotationSpeed = 0.0005;
    jupiter.rotationSpeed = 0.0001;
    jupiter.scale([0.5, 0.5, 0.5]);
    jupiter.translate([0, 0, 10]);

    return sun;
}