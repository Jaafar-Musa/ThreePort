import * as THREE from "three";
import { Group } from "three";
import { MyCharacterFSM } from ".";
import { IAnimation } from "./Loading";

export class Character {
  public character: Group;
  private scene: THREE.Scene;
  private inputs:Keypresses;
  public States:MyCharacterFSM
  public animations:IAnimation
  // public Mycamera!:MyCamera;
  constructor(char: Group, scene: THREE.Scene, animation:IAnimation) {
    this.character = char;
    this.scene = scene;
    this.animations = animation

    this.inputs = new Keypresses()
    this.States = new MyCharacterFSM(this.animations)
    this.Init();
  }

  private Init(): void {
    this.character.scale.setScalar(0.1);
    this.character.position.set(0, 0, -90);
    // this.character.rotateY
    this.character.traverse((c) => {
      c.castShadow = true;
    });
    this.scene.add(this.character);
    this.States.SetState("Idle")
  }
  public Update(t:number) {
    // console.log(t)
    //Handle animations
    if(this.States){
      this.States.Update(this.inputs.movements)
    }

    // Handle movements
    // const deceleration = new THREE.Vector3(-0.01, -0.1, -0.01);
    const velocity = new THREE.Vector3(0, 0, 0);
    const acceleration = new THREE.Vector3(1, 1, 0.5);
    const axis = new THREE.Vector3(0,1,0) 
    const quaternion = new THREE.Quaternion()
    const rotation = this.character.quaternion.clone()
    const degreeOfRotation = Math.PI/45
    // const frameDeceleration = new THREE.Vector3(
        
    // )

    if(this.inputs.movements.forward){
        velocity.z += acceleration.z
    }
    if(this.inputs.movements.backwards){
        velocity.z -= acceleration.z
    }
    if(this.inputs.movements.left || this.inputs.movements.right){
      quaternion.setFromAxisAngle(axis, this.inputs.movements.left ? -degreeOfRotation : degreeOfRotation)
      rotation.multiply(quaternion)
    }
    if(this.inputs.movements.sprint){
        velocity.z *=  3
    }
    this.character.quaternion.copy(rotation)

    const forward = new THREE.Vector3(0,0,1)
    forward.applyQuaternion(rotation)
    forward.normalize()
    forward.multiplyScalar(velocity.z)
    this.character.position.add(forward)
    // console.log(this.character.position)
  }
}

export interface IMovements {
  forward: boolean;
  backwards: boolean;
  left: boolean;
  right: boolean;
  sprint: boolean;
}
class Keypresses {
  public movements: IMovements;
  constructor() {
    this.movements = {
      forward: false,
      backwards: false,
      left: false,
      right: false,
      sprint: false,
    };
    this.Init();
  }
  private Init() {
    document.addEventListener("keydown", (e) => Keypress(e));
    document.addEventListener("keyup", (e) => Keypress(e));
    let Keypress = (e: KeyboardEvent) => {
      switch (e.key) {
        case "w":
        case "W":
          this.movements.forward = e.type === "keydown" ? true : false;
          break;
        case "s":
        case "S":
          this.movements.backwards = e.type === "keydown" ? true : false;
          break;
        case "d":
        case "D":
          this.movements.left = e.type === "keydown" ? true : false;
          break;
        case "a":
        case "A":
          this.movements.right = e.type === "keydown" ? true : false;
          break;
        case " ":
          this.movements.sprint = e.type === "keydown" ? true : false;
          break;
      }
    };
  }
}
