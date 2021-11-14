import * as THREE from "three";

// interface IProp {}

export class MyCamera {
    public camera: THREE.PerspectiveCamera;
    private scene:THREE.Scene;
    private character:THREE.Group;

    constructor(scene:THREE.Scene, character:THREE.Group){
        this.character = character
        this.scene = scene

        this.camera = new THREE.PerspectiveCamera(60, window.innerWidth/window.innerHeight, 0.1,2000)
        // this.camera.position.set(0,10,-30)
        // this.camera.rotateY(Math.PI)
        this.scene.add(this.camera)
    }

    private Ideals(...vectors:number[]): THREE.Vector3{
        let vector = new THREE.Vector3(...vectors)
        vector.applyEuler(this.character.rotation)
        vector.add(this.character.position)
        return vector
    }

    Update(tc:number){
        let idealOffSet = this.Ideals(-10,25,-25)
        let idealLookat = this.Ideals(-10,5,30)

        let currentPosition:THREE.Vector3= new THREE.Vector3();
        let currentLookAt:THREE.Vector3 = new THREE.Vector3();

        // const t = 0.01* tc
        // const t = 0.05;
        // const t = 4.0 * timeElapsed;
        const t = 1.0 - Math.pow(0.001, tc);

        currentPosition.lerp(idealOffSet,t)
        currentLookAt.lerp(idealLookat, t)

        this.camera.position.copy(currentPosition)
        this.camera.lookAt(currentLookAt)
        // console.log(tc)x

    }

}