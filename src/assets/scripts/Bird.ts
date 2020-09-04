import * as THREE from 'three';
import { ResourceLoader } from './ResourceLoader';
import { dumpObject } from './Util';
import { Vector2, MathUtils, OneMinusDstAlphaFactor } from 'three';

export class Bird extends THREE.Group {
    // object: THREE.Group;
    model: THREE.Group;
    moveRight: boolean;
    moveSpeed = 40;
    gravity = 20;

    velocity = new Vector2(0, 0);

    turning = false;
    curTurningTime = 0;
    maxTurningTime = 0.2;

    fromRotY = 0;
    toRotY = 0;

    constructor() {
        super();
        this.model = new THREE.Group();
        this.add(this.model);

        ResourceLoader.LoadGLTF('assets/models/parrot3.gltf', (gltf) => {
            const group = gltf.scene;
            group.scale.set(.5,.5,.5);
            // group.rotation.y = 90;
            this.model.add(group);
            console.log(dumpObject(group).join('\n'));
            return;
        });

        
        this.model.rotation.y = MathUtils.degToRad(90);
        // this.model.rotation.y = 270;
    }

    update(deltaTime: number) {
        this.move(deltaTime);
        this.rotate(deltaTime);
    }

    move(deltaTime: number) {
        this.velocity.x = (this.moveRight ? 0.1 : -0.1) * this.moveSpeed;
        this.velocity.y -= this.gravity * deltaTime;

        this.position.x += this.velocity.x * deltaTime;
        this.position.y += this.velocity.y * deltaTime;

        if (this.position.x > 4 || this.position.x < -4)
        {
            this.moveRight = !this.moveRight;
            this.turning = true;
            this.curTurningTime = 0;

            this.fromRotY = (this.moveRight == true) ? MathUtils.degToRad(90) : MathUtils.degToRad(270);
            this.toRotY = (this.moveRight == true) ? MathUtils.degToRad(270) : MathUtils.degToRad(90);
        }
        if (this.position.y < -5)
        {
            this.flap();
        }

        if (this.turning == true)
        {
            this.turn(deltaTime);
        }
    }

    flap() {
        this.velocity.y = 10;
    }

    turn(deltaTime: number) {
        this.curTurningTime += deltaTime;
        this.model.rotation.y = MathUtils.lerp(this.fromRotY, this.toRotY, this.curTurningTime / this.maxTurningTime);

        if (this.curTurningTime > this.maxTurningTime)
        {
            this.turning = false;
            this.model.rotation.y = this.toRotY;
        }
    }
    
    rotate(deltaTime: number) {
        // const direction = this.velocity.normalize();

        // let angleZ = Math.atan2(direction.y, direction.x) * MathUtils.RAD2DEG;
        let angleZ = Math.atan2(this.velocity.y, this.velocity.x) * MathUtils.RAD2DEG;
        if (angleZ > 90) angleZ = 180 - angleZ;
        if (angleZ < -90) angleZ = -180 - angleZ;

        // Vector3 newAngle = trans.localEulerAngles;
        // newAngle.z = angleZ;
        // trans.localEulerAngles = newAngle;

        this.rotation.z = angleZ * MathUtils.DEG2RAD;
    }
}