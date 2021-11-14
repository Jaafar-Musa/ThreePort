import { Mesh, MeshPhongMaterial, PlaneGeometry } from "three"

export class World{
    private scene : THREE.Scene
    constructor(scene:THREE.Scene){
        this.scene = scene

        this.Init()
    }
    private Init(){
        
        let floorGeo = new PlaneGeometry(30,30,1000,1000)
        let floorMaterial = new MeshPhongMaterial()

        let floor = new Mesh(floorGeo,floorMaterial)
        floor.receiveShadow = true;
        floor.rotation.x = -0.5 * Math.PI;
        this.scene.add(floor)
        // floor.p 
    }
}