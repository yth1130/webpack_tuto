// https://threejsfundamentals.org/threejs/lessons/kr/threejs-materials.html 보는 중.

//npm rub build 하면 dist에 파일 생성.
//dist폴더에서 http-server -c-1 으로 서버 실행 후 index.html켜기.

import _ from 'lodash';
import * as THREE from 'three';
import './style.css';
// import Icon from './icon.jpg';
// import printMe from './print.js';
// import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader'
import { OrbitControls } from 'three/examples//jsm/controls/OrbitControls'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader'

// import Parrot from './assets/Parrot.FBX';

// function component() {
//     const element = document.createElement('div');

//     // Lodash, currently included via a script, is required for this line to work
//     element.innerHTML = _.join(['Hello', 'webpack'], ' ');
//     // element.classList.add('hello');

//     // const myIcon = new Image();
//     // myIcon.src = Icon;

//     // element.appendChild(myIcon);

//     const btn = document.createElement('button');
//     btn.innerHTML = 'click me and check the console!';
//     btn.onclick = printMe;
//     element.appendChild(btn);

//     return element;
// }

// document.body.appendChild(component());

// var scene = new THREE.Scene();
// var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

// var renderer = new THREE.WebGLRenderer();
// renderer.setSize( window.innerWidth/2, window.innerHeight/2, false ); //세번째 인자(updateStyle)이 false이면 낮은 해상도로 렌더링된다.
// document.body.appendChild( renderer.domElement );

// var geometry = new THREE.BoxGeometry(); //점과 면을 갖는다.
// var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
// var cube = new THREE.Mesh( geometry, material );
// scene.add( cube );

// camera.position.z = 5;
// cube.position.x += 2;

// function animate() {
//     requestAnimationFrame(animate);
//     renderer.render(scene, camera);
//     cube.rotation.x += 0.01;
//     cube.rotation.y += 0.01;
// }
// animate();

// //create a blue LineBasicMaterial
// var lineMaterial = new THREE.LineBasicMaterial( { color: 0x0000ff } );
// var points = [];
// points.push( new THREE.Vector3( - 1, 0, 0 ) );
// points.push( new THREE.Vector3( 0, 1, 0 ) );
// points.push( new THREE.Vector3( 1, 0, 0 ) );
// points.push( new THREE.Vector3( -1, 0, 0 ) );

// // camera.position.set( 0, 0, 100 );
// // camera.lookAt( 0, 0, 0 );

// var lineGeometry = new THREE.BufferGeometry().setFromPoints( points );
// var line = new THREE.Line( lineGeometry, lineMaterial );
// scene.add( line );

function main() {
    // const element = document.createElement('div');
    // const canvas = document.querySelector('#c');
    const canvas = document.createElement('canvas');
    canvas.id = 'c';
    // canvas.width = window.innerWidth;
    // canvas.height = window.innerHeight;
    document.body.appendChild(canvas);
    // const body = document.body;
    // body.style.margin = '0';

	// function resize() {
    //     const canvas = document.createElement('canvas');
    //     canvas.width = window.innerWidth;
    //     canvas.height = window.innerHeight;
	// }
    // window.onresize = resize;

    const renderer = new THREE.WebGLRenderer({ canvas });

    const fov = 75;
    const aspect = 2;  // the canvas default
    const near = 0.1;
    const far = 100;
    const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    camera.position.z = 2;

    const scene = new THREE.Scene();

    const boxWidth = 1;
    const boxHeight = 1;
    const boxDepth = 1;
    const geometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth);

    // const material = new THREE.MeshBasicMaterial({color: 0x44aa88});  // greenish blue
    // const material = new THREE.MeshPhongMaterial({ color: 0x44aa88 });  // greenish blue

    // const cube = new THREE.Mesh(geometry, material);
    // scene.add(cube);

    // const fbxLoader = new FBXLoader();
    // console.log(fbxLoader);
    // fbxLoader.load(
    //     'assets/Parrot.FBX', 
    //     (result) => {
    //         scene.add(result);
    //     },
    //     null,
    //     (error) => { console.log(error) }
    // );
    const controls = new OrbitControls(camera, renderer.domElement)

    const birdMaterial = new THREE.MeshToonMaterial();
    let birdMesh; //: THREE.Object3D;

    const objLoader = new OBJLoader();
    // objLoader.parse
    objLoader.load(
        'assets/parrot.obj',
        (object) => {
            object.scale.x = .01
            object.scale.y = .01
            object.scale.z = .01
            object.position.y = 1
            scene.add(object);
            birdMesh = object.children[0];
            // (birdMesh as THREE.Mesh).material = normalMaterial
            birdMesh.material = birdMaterial
        },
        null,
        (error) => { console.log(error) }
    )

    function makeInstance(geometry, color, x) {
        const material = new THREE.MeshPhongMaterial({ color });

        const cube = new THREE.Mesh(geometry, material);
        scene.add(cube);

        cube.position.x = x;

        return cube;
    }

    const cubes = [
        makeInstance(geometry, 0x44aa88, 0),
        makeInstance(geometry, 0x8844aa, -2),
        makeInstance(geometry, 0xaa8844, 2),
    ]
    // scene.add(cubes);

    // renderer.render(scene, camera);

    function resizeRendererToDisplaySize(renderer) {
        const canvas = renderer.domElement;
        const pixelRatio = window.devicePixelRatio; // https://threejsfundamentals.org/threejs/lessons/kr/threejs-responsive.html
        const width  = canvas.clientWidth  * pixelRatio | 0;
        const height = canvas.clientHeight * pixelRatio | 0;
        const needResize = canvas.width !== width || canvas.height !== height;
        if (needResize) {
            renderer.setSize(width, height, false);
        }
        return needResize;
    }

    // const color = 0xFFFFFF;
    // const intensity = 10;
    // const light = new THREE.DirectionalLight(color, intensity);
    // light.position.set(-1, 2, 4);

    const light = new THREE.DirectionalLight();
    scene.add(light);

    function render(time) {
        time *= 0.001;  // convert time to seconds

        if (resizeRendererToDisplaySize(renderer)) {
            const canvas = renderer.domElement;
            camera.aspect = canvas.clientWidth / canvas.clientHeight;
            camera.updateProjectionMatrix();
        }

        // cube.rotation.x = time;
        // cube.rotation.y = time;
        cubes.forEach((cube, ndx) => {
            const speed = 1 + ndx * .1;
            const rot = time * speed;
            cube.rotation.x = rot;
            cube.rotation.y = rot;
        });

        controls.update()

        renderer.render(scene, camera);

        requestAnimationFrame(render);
    }
    requestAnimationFrame(render);
}

main();
