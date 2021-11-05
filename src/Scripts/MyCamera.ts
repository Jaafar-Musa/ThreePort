import * as THREE from "three";

// interface IProp {}

export class MyCamera {
    public camera: THREE.PerspectiveCamera;
    private scene:THREE.Scene;

    constructor(scene:THREE.Scene){
        this.scene = scene
        this.camera = new THREE.PerspectiveCamera(60, window.innerWidth/window.innerHeight, 0.1,2000)
        this.camera.position.set(0,10,10)
        this.scene.add(this.camera)
    }

    // private Ideals(...vectors){

    // }

    Update(tc:number){
        console.log(tc)
    }

}