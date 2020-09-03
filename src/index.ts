// import * as _ from 'lodash';
import * as THREE from 'three';
import './style.css';
import { OrbitControls } from 'three/examples//jsm/controls/OrbitControls'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader'
import { GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader'
import { MeshPhongMaterial, Loader } from 'three';
import { Bird } from './assets/scripts/Bird';


function main() {
    const canvas = document.createElement('canvas');
    canvas.id = 'c';
    document.body.appendChild(canvas);

    const renderer = new THREE.WebGLRenderer({ canvas });

    // const fov = 75;
    // const aspect = 2;  // the canvas default
    // const near = 0.1;
    // const far = 100;
    // const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    const width = 9;
    const height = 16;
    const camera = new THREE.OrthographicCamera(width / - 2, width / 2, height / 2, height / - 2, 1, 1000);
    camera.position.z = 10;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color('#333333');
    const boxWidth = 1;
    const boxHeight = 1;
    const boxDepth = 1;
    const geometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth);

    const controls = new OrbitControls(camera, renderer.domElement)

    const birdMaterial = new THREE.MeshToonMaterial();
    let birdMesh; //: THREE.Object3D;

    function dumpVec3(v3: THREE.Vector3 | THREE.Euler, precision = 3) {
        return `${v3.x.toFixed(precision)}, ${v3.y.toFixed(precision)}, ${v3.z.toFixed(precision)}`;
    }

    function dumpObject(obj: THREE.Group, lines: any[] = [], isLast = true, prefix = '') {
        const localPrefix = isLast ? '└─' : '├─';
        lines.push(`${prefix}${prefix ? localPrefix : ''}${obj.name || '*no-name*'} [${obj.type}]`);

        const dataPrefix = obj.children.length
           ? (isLast ? '  │ ' : '│ │ ')
           : (isLast ? '    ' : '│   ');
        lines.push(`${prefix}${dataPrefix}  pos: ${dumpVec3(obj.position)}`);
        lines.push(`${prefix}${dataPrefix}  rot: ${dumpVec3(obj.rotation)}`);
        lines.push(`${prefix}${dataPrefix}  scl: ${dumpVec3(obj.scale)}`);

        const newPrefix = prefix + (isLast ? '  ' : '│ ');
        const lastNdx = obj.children.length - 1;
        obj.children.forEach((child: any, ndx: number) => {
          const isLast = ndx === lastNdx;
          dumpObject(child, lines, isLast, newPrefix);
        });
        return lines;
    }

    var points = [];
    points.push( new THREE.Vector3( -4.4, +7.9, 0 ) );
    points.push( new THREE.Vector3( +4.4, +7.9, 0 ) );
    points.push( new THREE.Vector3( +4.4, -7.9, 0 ) );
    points.push( new THREE.Vector3( -4.4, -7.9, 0 ) );
    points.push( new THREE.Vector3( -4.4, +7.9, 0 ) );
    var lineGeometry = new THREE.BufferGeometry().setFromPoints( points );
    var lineMaterial = new THREE.LineBasicMaterial( { color: 0xffff00 } );
    var line = new THREE.Line( lineGeometry, lineMaterial );
    scene.add( line );
    
    const bird = new Bird();

    const textureLoader = new THREE.TextureLoader();

    const gltfLoader = new GLTFLoader();
    const url = 'assets/models/parrot3.gltf'; //'resources/models/cartoon_lowpoly_small_city_free_pack/scene.gltf';
    gltfLoader.load(url, (gltf) => {
        const root = gltf.scene;
        scene.add(root);
        root.scale.set(.5,.5,.5);
        // const mesh = root.children[0].children[1];
        // (mesh as THREE.Mesh).material = new MeshPhongMaterial({
        //     map: textureLoader.load('assets/parrot_texture.jpg'),
        //     skinning: true,
        // });
        bird.object = root;
        console.log(dumpObject(root).join('\n'));
    });



    gltfLoader.load('assets/models/ring.gltf', (gltf) => {
        const root = gltf.scene;
        scene.add(root);
        root.position.x = 5;
        console.log(dumpObject(root).join('\n'));
    });


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

    function resizeRendererToDisplaySize(renderer: THREE.WebGLRenderer) {
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
    light.intensity = 1.2;
    scene.add(light);

    function render(time: number) {
        time *= 0.001;  // convert time to seconds

        if (resizeRendererToDisplaySize(renderer)) {
            const canvas = renderer.domElement;
            // camera.aspect = canvas.clientWidth / canvas.clientHeight;
            const aspect = canvas.clientWidth / canvas.clientHeight;
            // console.log('aspect:'+ aspect);
            if (aspect >= 1)
            {
                const width = 16 * canvas.clientWidth / canvas.clientHeight;
                camera.left = width / -2;
                camera.right = width / 2;
                camera.top = 8;
                camera.bottom = -8;
            }
            else
            {
                // const width = 16 * canvas.clientWidth / canvas.clientHeight;
                const height = 9 * canvas.clientHeight / canvas.clientWidth;
                camera.left = -4.5;
                camera.right = 4.5;
                camera.top = height / 2;
                camera.bottom = height / -2;
            }
            camera.updateProjectionMatrix();
        }

        // cube.rotation.x = time;
        // cube.rotation.y = time;
        // cubes.forEach((cube, ndx) => {
        //     const speed = 1 + ndx * .1;
        //     const rot = time * speed;
        //     cube.rotation.x = rot;
        //     cube.rotation.y = rot;
        // });

        controls.update()

        renderer.render(scene, camera);

        bird.move();

        requestAnimationFrame(render);
    }
    requestAnimationFrame(render);
}

main();
