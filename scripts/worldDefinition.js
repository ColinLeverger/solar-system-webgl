var sun;
var myWorldBackground; //skybox

// Description of the solar system
// Caution: EACH object (except the sun) MUST have a parent (at least the sun) or it won't be displayed in the UI !
function initWorldObjects() {
    myWorldBackground = new sphere(null, 1);
    myWorldBackground.texture = worldTexture;

    var sun = new sphere(null, -1);
    sun.texture = sunTexture;
    sun.lightSource = true;
    sun.selfRotationSpeed = 0.0001;
    sun.scale([3, 3, 3]);

    // // ---------------------------------------- MERCURE
    var mercure = new sphere(sun);
    mercure.texture = mercureTexture;
    mercure.rotationDirection = 1;
    mercure.rotationSpeed = 0.00088; // Rotation autour du parent
    mercure.selfRotationSpeed = 0.00058;
    mercure.translate([0, 0, 8]); // Distance au soleil
    mercure.scale([0.2, 0.2, 0.2]); // Taille

    // // ---------------------------------------- VENUS
    var venus = new sphere(sun);
    venus.texture = venusTexture;
    venus.rotationDirection = 1;
    venus.rotationSpeed = 0.00025;
    venus.selfRotationSpeed = 0.000243;
    venus.translate([0, 0, 10]);
    venus.scale([0.3, 0.3, 0.3]);

    // // ---------------------------------------- EARTH
    var earth = new sphere(sun);
    earth.texture = earthTexture;
    earth.rotationDirection = 1;
    earth.rotationSpeed = 0.001;
    earth.selfRotationSpeed = 0.0005;
    earth.translate([0, 0, 10]);
    earth.scale([0.35, 0.35, 0.35]);

    var moon = new sphere(earth);
    moon.texture = moonTexture;
    moon.rotationDirection = 1;
    moon.selfRotationSpeed = 0.0005;
    moon.rotationSpeed = 0.0005;
    moon.translate([0, 0, 11]);
    moon.scale([0.15, 0.15, 0.15]);

    // // ---------------------------------------- MARS
    var mars = new sphere(sun);
    mars.texture = marsTexture;
    mars.rotationDirection = 1;
    mars.selfRotationSpeed = 0.0005;
    mars.rotationSpeed = 0.0004;
    mars.translate([0, 0, 13]);
    mars.scale([0.2, 0.2, 0.2]);

    // // // ---------------------------------------- JUPITER
    var jupiter = new sphere(sun);
    jupiter.texture = jupiterTexture;
    jupiter.rotationDirection = 1;
    jupiter.selfRotationSpeed = 0.0007;
    jupiter.rotationSpeed = 0.0003;
    jupiter.translate([0, 0, 7]);
    jupiter.scale([0.7, 0.7, 0.7]);

    // ---------------------------------------- SATURNE
    var saturne = new sphere(sun);
    saturne.texture = saturneTexture;
    saturne.rotationDirection = 1;
    saturne.selfRotationSpeed = 0.0005;
    saturne.rotationSpeed = 0.0001;
    saturne.translate([0, 0, 13]);
    saturne.scale([0.5, 0.5, 0.5]);

    // ---------------------------------------- URANUS
    var uranus = new sphere(sun);
    uranus.texture = uranusTexture;
    uranus.rotationDirection = 1;
    uranus.selfRotationSpeed = 0.0007;
    uranus.rotationSpeed = 0.00008;
    uranus.translate([0, 0, 15]);
    uranus.scale([0.6, 0.6, 0.6]);

    return sun;
}