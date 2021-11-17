import { Mesh, MeshPhongMaterial, PlaneGeometry } from "three";
import { IObjs } from "./Loading";

export class World {
  private scene: THREE.Scene;
  private objs: IObjs;
  private coords: [x: number, z: number][] = [
    [100, -100],
    [-100, -100],
    [-200, 173],
    [-100, 247],
    [100, 247],
    [200, 173],
  ];
  constructor(scene: THREE.Scene, objs: IObjs) {
    this.scene = scene;
    this.objs = objs;

    this.Init();
  }
  private Init() {
    this.AddFloor();
    // this.AddTrees();
    this.AddGrass();
  }
  private AddFloor() {
    let floorGeo = new PlaneGeometry(1000, 1000, 40, 50);
    let floorMaterial = new MeshPhongMaterial({ color: 0x3f9b0b });

    let floor = new Mesh(floorGeo, floorMaterial);
    floor.receiveShadow = true;
    floor.rotation.x = -0.5 * Math.PI;
    this.scene.add(floor);
    // floor.p
  }
//   private AddTrees() {
//     let tree = this.objs["Tree"];
//     tree.position.set(0, 0, 40);
//     tree.scale.setScalar(0.5);
//     this.scene.add(tree);
//   }
  private AddGrass() {
    let calcs = (c1:[x:number,z:number],c2:[x:number,z:number])=>{
        let m = (c2[1] - c1[1])/(c2[0] - c1[0])
        let e = (val:number) => m*(val - c2[0]) + c2[1]
        return e
    }
    let appendGrass = (x:number, z:number) =>{

        let grass = this.objs["Tree"]
        let otherGrass = grass.clone()
        otherGrass.position.set(x,0,z)
        otherGrass.scale.setScalar(0.03)
        this.scene.add(otherGrass)
    }
    let i;
    for (i = 0 ; i < this.coords.length; i++) {
        let j = (i + 1) % this.coords.length
        let c1 = this.coords[i]
        let c2 = this.coords[j]
        let z = calcs(c1, c2)
        let smallerVal = Math.min(c1[0],c2[0])
        let largerVal = Math.max(c1[0],c2[0])
        while(smallerVal < largerVal){
            smallerVal += 10
            let zVal = z(smallerVal)
            appendGrass(smallerVal,zVal)
        }
    }

  }
}
