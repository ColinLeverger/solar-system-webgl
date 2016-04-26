var mouseDown = false;
var lastMouseX = null;
var lastMouseY = null;
var currentZoom = 1;

var toggleSphere = true;

function handleMouseDown(event) {
    mouseDown = true;
    lastMouseX = event.clientX;
    lastMouseY = event.clientY;
}

function handleMouseUp(event) {
    mouseDown = false;
}

function handleMouseMove(event) {
    if (!mouseDown) {
        return;
    }
    if (mouseControl) {
        var newX = event.clientX;
        var newY = event.clientY;

        var newRotationMatrix = mat4.create();
        mat4.identity(newRotationMatrix);

        var deltaX = newX - lastMouseX;
        mat4.rotate(newRotationMatrix, degToRad(deltaX / 7), [0, 1, 0]);

        var deltaY = newY - lastMouseY;
        mat4.rotate(newRotationMatrix, degToRad(deltaY / 7), [1, 0, 0]);

        mat4.multiply(newRotationMatrix, userRotationMatrix, userRotationMatrix);

        lastMouseX = newX;
        lastMouseY = newY;
    }
}

function handleWheel(event) {
    event.preventDefault();
    currentZoom *= 1 + (event.wheelDelta / Math.abs(event.wheelDelta)) / 10;
}

function handleKeyDown(event) {
    //console.log(event.keyCode);
    event.preventDefault();
    switch (event.keyCode) {
        case 37: //left
            camX++;
            break;
        case 39: //right
            camX--;
            break;
        case 38: //down
            camZ++;
            break;
        case 40: //forward
            camZ--;
            break;
        case 33: //pageUp
            camHeight += degToRad(1);
            break;
        case 34: //pageDown
            camHeight -= degToRad(1);
            break;
        case 116:
            window.location.reload();
            break;
        case 82:
            window.location.reload();
            break;
        default:
            break;
    }
}

function drawCombo(list) {
    drawStyle = list.selectedIndex;
}

var lightingOn = true;
var ambiantLightOn = true;
var isTurning = true;
var mouseControl = true;

function handleClick(checkMesh) {
    switch (checkMesh.value) {
        case 'lightOn':
            lightingOn = checkMesh.checked;
            document.getElementById("ambiantLight").checked = checkMesh.checked;
            break;
        case 'ambiantLightOn':
            ambiantLightOn = checkMesh.checked;
            break;
        case 'earthOn':
            for (var i = 0; i < sun.children.length; i++) {
                if (sun.children[i].texture == earthTexture) {
                    sun.children[i].show = checkMesh.checked;
                }
            }
            break;
        case 'isTurning':
            isTurning = checkMesh.checked;
            break;
        case 'mouseControl':
            mouseControl = checkMesh.checked;
            break;
        default:
    }
}

var speedOfRotation = 1;

function handleSlider1(sliderValue) {
    speedOfRotation = sliderValue;
}