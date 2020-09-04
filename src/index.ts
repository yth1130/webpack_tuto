// import * as _ from 'lodash';
import * as THREE from 'three';
import './style.css';
import { OrbitControls } from 'three/examples//jsm/controls/OrbitControls'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader'
import { GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader'
import { MeshPhongMaterial, Loader, Vector3, Vector2 } from 'three';
import { Bird } from './assets/scripts/Bird';
import { dumpObject } from './assets/scripts/Util';
import { MainScene } from './assets/scripts/MainScene';

function main() {
    const canvas = document.createElement('canvas');
    canvas.id = 'c';
    document.body.appendChild(canvas);

    const renderer = new THREE.WebGLRenderer({ canvas });

    const curScene = new MainScene(renderer);
    curScene.background = new THREE.Color('#333333');
    
    

    const gltfLoader = new GLTFLoader();
    gltfLoader.load('assets/models/ring.gltf', (gltf) => {
        const root = gltf.scene;
        curScene.add(root);
        root.position.x = 5;
        console.log(dumpObject(root).join('\n'));
    });


    
    window.addEventListener('resize', onWindowResize, false)
    function onWindowResize() {
        resizeRendererToDisplaySize(renderer);
    }

    function resizeRendererToDisplaySize(renderer: THREE.WebGLRenderer) {
        const canvas = renderer.domElement;
        const pixelRatio = window.devicePixelRatio; // https://threejsfundamentals.org/threejs/lessons/kr/threejs-responsive.html
        const width  = canvas.clientWidth  * pixelRatio | 0;
        const height = canvas.clientHeight * pixelRatio | 0;
        const needResize = canvas.width !== width || canvas.height !== height;
        if (needResize) {
            renderer.setSize(width, height, false);
            curScene.resize();
        }
        return needResize;
    }
    resizeRendererToDisplaySize(renderer);


    // var vector = new THREE.Vector3( ( e.clientX / window.innerWidth ) * 2 - 1, - ( e.clientY / window.innerHeight ) * 2 + 1, 0.999 );
    // projector.unprojectVector( vector, camera );
    // const raycaster = new THREE.Raycaster(curScene.camera.position, Vector3.sub)
    const mousePosition = new Vector2;
    window.addEventListener('touchend', onDocumentTouchEnd, false);
    function onDocumentTouchEnd(event: any) {
        event.preventDefault();

        mousePosition.x = (event.changedTouches[0].clientX / window.innerWidth) * 2 - 1;
        mousePosition.y = -(event.changedTouches[0].clientY / window.innerHeight) * 2 + 1;

        // console.log(mouse);
        
        curScene.touch(mousePosition);

        // raycaster.setFromCamera(mouse, camera);
        // const intersects = raycaster.intersectObjects(yourObject3D);
    }


    let preElapsedTime = 0;
    let curElapsedTime = 0;
    function render(elapsedTime: number) {
        elapsedTime *= 0.001;  // convert time to seconds

        preElapsedTime = curElapsedTime;
        curElapsedTime = elapsedTime;
        // console.log(curElapsedTime - preElapsedTime);
        curScene.render(curElapsedTime - preElapsedTime);

        requestAnimationFrame(render);
    }
    requestAnimationFrame(render);
}

main();


    // const scene = new THREE.Scene();
    // scene.background = new THREE.Color('#333333');

    // const fov = 75;
    // const aspect = 2;  // the canvas default
    // const near = 0.1;
    // const far = 100;
    // const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    
    // const boxWidth = 1;
    // const boxHeight = 1;
    // const boxDepth = 1;
    // const geometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth);

    // const controls = new OrbitControls(camera, renderer.domElement)

    // const birdMaterial = new THREE.MeshToonMaterial();
    // let birdMesh; //: THREE.Object3D;


        // cube.rotation.x = time;
        // cube.rotation.y = time;
        // cubes.forEach((cube, ndx) => {
        //     const speed = 1 + ndx * .1;
        //     const rot = time * speed;
        //     cube.rotation.x = rot;
        //     cube.rotation.y = rot;
        // });

        // controls.update()


        // if (resizeRendererToDisplaySize(renderer)) {
        //     const canvas = renderer.domElement;
        //     const aspect = canvas.clientWidth / canvas.clientHeight;
        //     camera.updateAspect(aspect);
        //     camera.updateProjectionMatrix();
        // }

        // renderer.render(scene, camera);


    // const torusGeometry = new THREE.TorusBufferGeometry(10,1,9,25);
    // //radius, tubeRadius,
    // //radialSegments, tubularSegments);
    // const torus = makeInstance(torusGeometry, 0xff0000, 3);
    // torus.scale.set(0.1,0.1,0.1);

    // function makeInstance(geometry: any, color: any, x: number) {
    //     const material = new THREE.MeshPhongMaterial({ color });

    //     const cube = new THREE.Mesh(geometry, material);
    //     scene.add(cube);

    //     cube.position.x = x;

    //     return cube;
    // }

    // const cubes = [
    //     makeInstance(geometry, 0x44aa88, 0),
    //     makeInstance(geometry, 0x8844aa, -2),
    //     makeInstance(geometry, 0xaa8844, 2),
    // ]
    // scene.add(cubes);

    // renderer.render(scene, camera);


    // function resizeRendererToDisplaySize(renderer: THREE.WebGLRenderer) {
    //     const canvas = renderer.domElement;
    //     const pixelRatio = window.devicePixelRatio; // https://threejsfundamentals.org/threejs/lessons/kr/threejs-responsive.html
    //     const width  = canvas.clientWidth  * pixelRatio | 0;
    //     const height = canvas.clientHeight * pixelRatio | 0;
    //     const needResize = canvas.width !== width || canvas.height !== height;
    //     if (needResize) {
    //         renderer.setSize(width, height, false);
    //     }
    //     return needResize;
    // }



    
    // const textureLoader = new THREE.TextureLoader();

    // const url = 'assets/models/parrot3.gltf'; //'resources/models/cartoon_lowpoly_small_city_free_pack/scene.gltf';
    // gltfLoader.load(url, (gltf) => {
    //     const root = gltf.scene;
    //     scene.add(root);
    //     root.scale.set(.5,.5,.5);
    //     // const mesh = root.children[0].children[1];
    //     // (mesh as THREE.Mesh).material = new MeshPhongMaterial({
    //     //     map: textureLoader.load('assets/parrot_texture.jpg'),
    //     //     skinning: true,
    //     // });
    //     bird.object = root;
    //     console.log(dumpObject(root).join('\n'));
    // });

    // ResourceLoader.LoadGLTF('assets/models/parrot3.gltf', scene, bird);