// World
var sun;
var myWorldBackground;

function initWorldObjects() {
    sun = new sphere(null);
    sun.texture = sunTexture;
    sun.selfRotationSpeed = 0.0001;

    var earth = new sphere(sun, normalDirection = -1);
    earth.texture = earthTexture;
    earth.rotationDirection = 1;
    earth.rotationSpeed = 0.001;
    earth.selfRotationSpeed = 0.0005;
    earth.translate([0, 0, 15]);
    earth.scale([0.3, 0.3, 0.3]);

    var moon = new sphere(earth, normalDirection = 1);
    moon.texture = moonTexture;
    moon.rotationDirection = 1;
    moon.selfRotationSpeed = 0.005;
    moon.rotationSpeed = 0.005;
    moon.translate([0, 0, 7]);
    moon.scale([0.3, 0.3, 0.3]);

    var jupiter = new sphere(sun, normalDirection = 1);
    jupiter.texture = jupiterTexture;
    jupiter.rotationDirection = -1;
    jupiter.selfRotationSpeed = 0.0005;
    jupiter.rotationSpeed = 0.0001;
    jupiter.translate([0, 0, 30]);
    jupiter.scale([0.5, 0.5, 0.5]);

    var mars = new sphere(sun, normalDirection = 1);
    mars.texture = marsTexture;
    mars.rotationDirection = 1;
    mars.selfRotationSpeed = 0.0005;
    mars.rotationSpeed = 0.0001;
    mars.translate([0, 0, 50]);
    mars.scale([0.2, 0.2, 0.2]);

    myWorldBackground = new sphere(null, normalDirection = 1);
    myWorldBackground.texture = worldTexture;

    return sun;
}