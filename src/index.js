// https://webpack.js.org/guides/asset-management/#loading-images 보는 중.

import _ from 'lodash';
import * as THREE from 'three';
import './style.css';

function component() {
    const element = document.createElement('div');

    // Lodash, currently included via a script, is required for this line to work
    element.innerHTML = _.join(['Hello', 'webpack'], ' ');
    element.classList.add('hello');

    return element;
}

document.body.appendChild(component());

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth/2, window.innerHeight/2, false ); //세번째 인자(updateStyle)이 false이면 낮은 해상도로 렌더링된다.
document.body.appendChild( renderer.domElement );

var geometry = new THREE.BoxGeometry(); //점과 면을 갖는다.
var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
var cube = new THREE.Mesh( geometry, material );
scene.add( cube );

camera.position.z = 5;
cube.position.x += 2;

function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
}
animate();

//create a blue LineBasicMaterial
var lineMaterial = new THREE.LineBasicMaterial( { color: 0x0000ff } );
var points = [];
points.push( new THREE.Vector3( - 1, 0, 0 ) );
points.push( new THREE.Vector3( 0, 1, 0 ) );
points.push( new THREE.Vector3( 1, 0, 0 ) );
points.push( new THREE.Vector3( -1, 0, 0 ) );

// camera.position.set( 0, 0, 100 );
// camera.lookAt( 0, 0, 0 );

var lineGeometry = new THREE.BufferGeometry().setFromPoints( points );
var line = new THREE.Line( lineGeometry, lineMaterial );
scene.add( line );