// Geometry
var pasLat = 3;
var pasLong = 6;
var tetaMax = 360;
var phiMax = 90;

sphere.prototype = new worldObject;
function sphere(parent, size) {
    this.base = worldObject;
    this.base(parent);
    var buffers = this.initBuffers(size);
    this.vertexPositionBuffer = buffers[0];
    this.vertexTextureCoordBuffer = buffers[1];
    this.vertexIndexBuffer = buffers[2];
    //il manque surement quelque chose pour les normales ici
}

sphere.prototype.initBuffers = function (size) {
    //il manque le code des normales à ajouter!
    vertices = [];
    textureCoords = [];
    var nbVertice = 0;
    var sphereVertexIndices = [];
    var nbTriangles = 0;
    var resLat = 0;
    var resLongi = tetaMax / pasLong + 1;
    for (var lat = -90; lat <= phiMax; lat += pasLat) {
        for (var longi = 0; longi <= tetaMax; longi += pasLong) {
            vertices = vertices.concat(pol2Cart(longi, lat, size)); //A
            //il manque le code des normales à ajouter!
            textureCoords = textureCoords.concat([longi / tetaMax, (90 + lat) / (90 + phiMax)]);
            if (longi != tetaMax) {
                if (lat < phiMax) {
                    sphereVertexIndices = sphereVertexIndices.concat([
                        nbVertice,
                        nbVertice + 1,
                        nbVertice + 1 + resLongi,

                        nbVertice,
                        nbVertice + 1 + resLongi,
                        nbVertice + resLongi,
                    ]);

                    nbTriangles += 2;
                }
            }
            nbVertice += 1;
        }
        resLat++;
    }

    vertexPositionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexPositionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
    vertexPositionBuffer.itemSize = 3;
    vertexPositionBuffer.numItems = nbVertice;

    vertexIndexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, vertexIndexBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(sphereVertexIndices), gl.STATIC_DRAW);
    vertexIndexBuffer.itemSize = 1;
    vertexIndexBuffer.numItems = nbTriangles * 3;

    vertexTextureCoordBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexTextureCoordBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(textureCoords), gl.STATIC_DRAW);
    vertexTextureCoordBuffer.itemSize = 2;
    vertexTextureCoordBuffer.numItems = nbVertice;

    //il manque le code des normales à ajouter!

    return [vertexPositionBuffer, vertexTextureCoordBuffer, vertexIndexBuffer];
};


function pol2Cart(longi, lat, size) {
    return [
        size * Math.cos(degToRad(lat)) * Math.sin(degToRad(longi)),
        size * Math.sin(degToRad(lat)),
        size * Math.cos(degToRad(lat)) * Math.cos(degToRad(longi))
    ];
}