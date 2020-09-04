import * as THREE from 'three';

export class SimpleOrthoCamera extends THREE.OrthographicCamera {

    baseWidth: number;
    baseHeight: number;

    constructor(baseWidth: number, baseHeight: number, near?: number, far?: number) {
        super(baseWidth / - 2, baseWidth / 2, baseHeight / 2, baseHeight / - 2, near, far);

        this.baseWidth = baseWidth;
        this.baseHeight = baseHeight;

    }

    updateAspect(aspect: number) { //가로 / 세로.
        if (aspect >= 1) //가로 화면.
        {
            const width = this.baseHeight * aspect;
            this.left = width / -2;
            this.right = width / 2;
            this.top = this.baseHeight / 2;
            this.bottom = this.baseHeight / -2;
        }
        else //세로 화면.
        {
            const height = this.baseWidth * 1 / aspect;
            this.left = this.baseWidth / -2;
            this.right = this.baseWidth / 2;
            this.top = height / 2;
            this.bottom = height / -2;
        }
    }
}