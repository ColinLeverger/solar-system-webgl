// World
var sun;

var myWorldBackground;

function initWorldObjects() {
    myWorldBackground = new sphere(null, 1);
    myWorldBackground.texture = worldTexture;

    sun = new sphere(null, -1);
    sun.texture = sunTexture;
    sun.selfRotationSpeed = 0.0001;

    var earth = new sphere(sun);
    earth.texture = earthTexture;
    earth.rotationDirection = 1;
    earth.rotationSpeed = 0.001;
    earth.selfRotationSpeed = 0.0005;
    earth.translate([0, 0, 15]);
    earth.scale([0.3, 0.3, 0.3]);
    
    var asteroid1 = new asteroid(sun);
    asteroid1.texture = asteroidTexture;
    asteroid1.rotationDirection = 1;
    asteroid1.rotationSpeed = 0.001;
    asteroid1.selfRotationSpeed = 0.0005;
    asteroid1.translate([0, 0, 10]);
    asteroid1.scale([0.9, 0.9, 0.9]);

    var moon = new sphere(earth);
    moon.texture = moonTexture;
    moon.rotationDirection = 1;
    moon.selfRotationSpeed = 0.005;
    moon.rotationSpeed = 0.005;
    moon.translate([0, 0, 7]);
    moon.scale([0.3, 0.3, 0.3]);

    var jupiter = new sphere(sun);
    jupiter.texture = jupiterTexture;
    jupiter.rotationDirection = -1;
    jupiter.selfRotationSpeed = 0.0005;
    jupiter.rotationSpeed = 0.0001;
    jupiter.translate([2, 0, 30]);
    jupiter.scale([0.5, 0.5, 0.5]);

    var europe = new sphere(jupiter);
    europe.texture = moonTexture;
    europe.rotationDirection = 1;
    europe.selfRotationSpeed = 0.0009;
    europe.rotationSpeed = 0.005;
    europe.translate([0, 3, 3]);
    europe.scale([0.5, 0.5, 0.5]);

    var mars = new sphere(sun);
    mars.texture = marsTexture;
    mars.rotationDirection = 1;
    mars.selfRotationSpeed = 0.01;
    mars.rotationSpeed = 0.0001;
    mars.translate([0, 0, 50]);
    mars.scale([0.2, 0.2, 0.2]);

    return sun;
}