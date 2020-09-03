import * as THREE from 'three';

export class Bird extends THREE.Object3D {
    object: THREE.Group;
    moveRight: boolean;

    move() {
        if (this.object == null)
            return;
        this.object.position.x += this.moveRight ? 0.1 : -0.1;
        if (this.object.position.x > 4)
        {
            this.moveRight = false;
        }
        if (this.object.position.x < -4)
        {
            this.moveRight = true;
        }
    }
}