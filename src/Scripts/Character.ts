import * as THREE from "three"
import { Group } from "three";
import {IAnimation} from "./Loading"

export class Character{
    public character:Group;
    private scene:THREE.Scene;
    private animations!: IAnimation[]
    constructor(char:Group, scene:THREE.Scene, animations:IAnimation[]){
        console.log(animations)
        this.character = char
        this.scene = scene
        this.animations = animations
        this.Init()
    }

    private Init(): void{
        this.character.scale.setScalar(0.1)
        // this.character.add
        this.character.position.set(0,0,-10)
        this.scene.add(this.character)
        console.log(this.animations)
        
        // this.animations[!0]!.Idle.play()
        this.animations[0].Idle.play()
        console.log(this.animations[0].Idle.isRunning())
        console.log(this.animations[1].Reaction.isRunning())
        // this.animations[0].
        // console.log(this.animations)
    }


}
