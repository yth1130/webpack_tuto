import * as THREE from 'three';
import { SimpleOrthoCamera } from './SimpleOrthoCamera';
import { Bird } from './Bird';
import { Vector2 } from 'three';

export class MainScene extends THREE.Scene {

    renderer: THREE.WebGLRenderer;
    camera: SimpleOrthoCamera;
    light: THREE.DirectionalLight;

    bird: Bird;

    constructor(renderer: THREE.WebGLRenderer) {
        super();

        this.renderer = renderer;

        const baseWidth = 9;
        const baseHeight = 16;
        // const camera = new THREE.OrthographicCamera(width / - 2, width / 2, height / 2, height / - 2, 1, 1000);
        this.camera = new SimpleOrthoCamera(baseWidth, baseHeight);
        this.camera.position.z = 10;


        var points = [];
        points.push( new THREE.Vector3( -4.4, +7.9, 0 ) );
        points.push( new THREE.Vector3( +4.4, +7.9, 0 ) );
        points.push( new THREE.Vector3( +4.4, -7.9, 0 ) );
        points.push( new THREE.Vector3( -4.4, -7.9, 0 ) );
        points.push( new THREE.Vector3( -4.4, +7.9, 0 ) );
        var lineGeometry = new THREE.BufferGeometry().setFromPoints( points );
        var lineMaterial = new THREE.LineBasicMaterial( { color: 0xffff00 } );
        var line = new THREE.Line( lineGeometry, lineMaterial );
        this.add( line );

        const color = 0xFFFFFF;
        const intensity = 1.2;
        const light = new THREE.DirectionalLight(color, intensity);
        this.light = light;
        this.add(light);

        this.bird = new Bird();
        this.add(this.bird);

        // this.on
    }
    
    resize() {
        const canvas = this.renderer.domElement;
        const aspect = canvas.clientWidth / canvas.clientHeight;

        this.camera.updateAspect(aspect);
        this.camera.updateProjectionMatrix();
    }

    render(deltaTime: number) {
        this.renderer.render(this, this.camera);
        this.bird.update(deltaTime);
    }

    touch(mousePosition: Vector2) {
        this.bird.flap();
    }
}