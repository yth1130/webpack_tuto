// import * as THREE from "three"
import * as THREE from '/build/three.module.js'
import { OrbitControls } from '/jsm/controls/OrbitControls'
// import { FBXLoader } from '/jsm/loaders/FBXLoader' //https://sbcode.net/threejs/loaders-fbx/
import { OBJLoader } from '/jsm/loaders/OBJLoader' //https://sbcode.net/threejs/loaders-fbx/

const scene: THREE.Scene = new THREE.Scene()

const camera: THREE.PerspectiveCamera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)

const renderer: THREE.WebGLRenderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

const controls = new OrbitControls(camera, renderer.domElement)
// controls.addEventListener('change', render) //this line is unnecessary if you are re-rendering within the animation loop 

const geometry: THREE.BoxGeometry = new THREE.BoxGeometry()
const material: THREE.MeshBasicMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe: true })

const cube: THREE.Mesh = new THREE.Mesh(geometry, material)
scene.add(cube)

camera.position.z = 10; //2

// const fbxLoader: FBXLoader = new FBXLoader();
// fbxLoader.load(
//     'assets/parrot.fbx', 
//     (object)=>{
//         scene.add(object);
//     },
//     (xhr) => {
//         console.log((xhr.loaded / xhr.total * 100) + '% loaded')
//     },
//     (error) => {
//         console.log(error);
//     }
// );

// var light1 = new THREE.SpotLight()
// light1.position.set(2.5, 5, 5)
// light1.angle = Math.PI / 4
// light1.penumbra = 0.5
// light1.castShadow = true
// light1.shadow.mapSize.width = 1024
// light1.shadow.mapSize.height = 1024
// light1.shadow.camera.near = 0.5
// light1.shadow.camera.far = 20
// scene.add(light1)

var light = new THREE.DirectionalLight();
scene.add(light);


const normalMaterial: THREE.MeshNormalMaterial = new THREE.MeshNormalMaterial()
const parrotMaterial = new THREE.Material();

let parrotMesh: THREE.Object3D
// let parrotBody: CANNON.Body
// let parrotLoaded: Boolean = false
// const fbxLoader: FBXLoader = new FBXLoader()
const objLoader: OBJLoader = new OBJLoader();
objLoader.load(
    'assets/parrot.obj',
    (object) => {
        // object.position.x = -5
        // object.position.y = 20
        // object.position.z = 0
        object.scale.x = .1
        object.scale.y = .1
        object.scale.z = .1
        scene.add(object)
        parrotMesh = object.children[0];
        (parrotMesh as THREE.Mesh).material = normalMaterial
        // parrotMesh.position.x = -5
        // parrotMesh.position.y = 20
    },
    (xhr) => {
        console.log((xhr.loaded / xhr.total * 100) + '% loaded')
    },
    (error) => {
        console.log('An error happened')
    }
);

window.addEventListener('resize', onWindowResize, false)
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
    // render()
}

var animate = function () {
    requestAnimationFrame(animate)

    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;

    controls.update()

    // renderer.render(scene, camera)
    render();
};

function render() {
    renderer.render(scene, camera);
}

animate();