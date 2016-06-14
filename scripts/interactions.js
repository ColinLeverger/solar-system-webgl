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
    if ( !mouseDown ) {
        return;
    }
    if ( mouseControl ) {
        var newX = event.clientX;
        var newY = event.clientY;
        
        var newRotationMatrix = mat4.create();
        mat4.identity(newRotationMatrix);
        
        var deltaX = newX - lastMouseX;
        mat4.rotate(newRotationMatrix, degToRad(deltaX / 7), [ 0, 1, 0 ]);
        
        var deltaY = newY - lastMouseY;
        mat4.rotate(newRotationMatrix, degToRad(deltaY / 7), [ 1, 0, 0 ]);
        
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
    event.preventDefault();
    function reinitCameraOrientation() {
        camera.direction = 0;
        camera.height = 0;
    }
    
    if ( camera.canMove ) {
        switch ( event.keyCode ) {
            case 37: // left
                camera.x = camera.x + 1;
                reinitCameraOrientation();
                break;
            case 39: // right
                camera.x = camera.x - 1;
                reinitCameraOrientation();
                break;
            case 38: // up
                camera.z = camera.z + 1;
                reinitCameraOrientation();
                break;
            case 40: // down
                camera.z = camera.z - 1;
                reinitCameraOrientation();
                break;
            case 32: // " "
                camera.y = camera.y - 1;
                reinitCameraOrientation();
                break;
            case 67: // c
                camera.y = camera.y + 1;
                reinitCameraOrientation();
                break;
            default:
                break;
        }
    }
    switch ( event.keyCode ) {
        case 33: // pageUp
            camera.height -= degToRad(1);
            break;
        case 34: // pageDown
            camera.height += degToRad(1);
            break;
        case 35: // end / right
            camera.direction += degToRad(1);
            break;
        case 36: // home / left
            camera.direction -= degToRad(1);
            break;
        case 116: // r
            window.location.reload();
            break;
        case 82:  // f5
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
var mouseControl = false;

function handleClick(checkMesh) {
    switch ( checkMesh.value ) {
        case 'lightOn':
            lightingOn = checkMesh.checked;
            document.getElementById("ambiantLight").checked = checkMesh.checked;
            break;
        case 'ambiantLightOn':
            ambiantLightOn = checkMesh.checked;
            break;
        case 'earthOn':
            for ( var i = 0 ; i < sun.children.length ; i++ ) {
                if ( sun.children[ i ].texture == earthTexture ) {
                    sun.children[ i ].show = checkMesh.checked;
                }
            }
            break;
        case 'isTurning':
            isTurning = checkMesh.checked;
            break;
        case 'mouseControl':
            mouseControl = checkMesh.checked;
            break;
        case 'camera1':
            camera = camera1;
            camera.canMove = true;
            document.getElementById("camera2").checked = false;
            document.getElementById("camera3").checked = false;
            break;
        case 'camera2':
            camera = camera2;
            camera.canMove = false;
            document.getElementById("camera1").checked = false;
            document.getElementById("camera3").checked = false;
            break;
        case 'camera3':
            camera = camera3;
            camera.canMove = false;
            document.getElementById("camera1").checked = false;
            document.getElementById("camera2").checked = false;
            break;
        default:
    }
}

var speedOfRotation = 1;

function handleSlider1(sliderValue) {
    speedOfRotation = sliderValue;
}