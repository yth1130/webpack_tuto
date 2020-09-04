import { GLTFLoader, GLTF } from 'three/examples/jsm/loaders/GLTFLoader';
import { dumpObject } from './Util';
import { Bird } from './Bird';

export class ResourceLoader {

    static gltfLoader: GLTFLoader = new GLTFLoader();

    static LoadGLTF(url: string, onLoad: (gltf: GLTF) => void) { //scene: THREE.Scene, bird: Bird) {
        
        this.gltfLoader.load(url, onLoad);
    }
}