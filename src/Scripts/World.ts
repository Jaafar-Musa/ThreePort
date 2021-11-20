import {
  Group,
  Mesh,
  MeshPhongMaterial,
  PlaneGeometry,
  Ray,
  Raycaster,
  Vector3,
  Object3D,
} from "three";
import { IObjs } from "./Loading";

export class World {
  private scene: THREE.Scene;
  private objs: IObjs;
  private character: Group;
  private collidableObjs: THREE.Group[] = [];
  private coords: [x: number, z: number][] = [
    [150, -150],
    [-150, -150],
    [-409.8076211, 109.5807621],
    [-150, 369.6152423],
    [150, 369.6152423],
    [409.8076211, 109.5807621],
  ];
  constructor(scene: THREE.Scene, objs: IObjs, character: Group) {
    this.character = character;
    this.scene = scene;
    this.objs = objs;
    this.Init();
  }
  private Init() {
    this.AddFloor();
    this.AddTrees();
    this.AddGrass();
    // this.Collision()
  }
  private AddFloor() {
    let floorGeo = new PlaneGeometry(1300, 1800, 40, 50);
    let floorMaterial = new MeshPhongMaterial({ color: 0x3f9b0b });
    let floor = new Mesh(floorGeo, floorMaterial);
    floor.receiveShadow = true;
    floor.position.set(0, 0, 200);
    floor.rotation.x = -0.5 * Math.PI;
    this.scene.add(floor);
    // floor.p
  }
  private AddTrees() {
    console.log(this.character);
    let tree = this.objs["Tree"];
    tree.position.set(0, 0, 40);
    tree.scale.setScalar(0.5);
    this.collidableObjs.push(tree);
    this.scene.add(tree);
  }
  private AddGrass() {
    let lineEq = (c1: [x: number, z: number], c2: [x: number, z: number]) => {
      let m = (c2[1] - c1[1]) / (c2[0] - c1[0]);
      let eq = (val: number) => m * (val - c2[0]) + c2[1];
      return eq;
    };
    let appendGrass = (x: number, z: number) => {
      let grass = this.objs["Tree"];
      let otherGrass = grass.clone();
      otherGrass.position.set(x, 0, z);
      otherGrass.scale.setScalar(0.3);
      this.collidableObjs.push(otherGrass);
      this.scene.add(otherGrass);
    };
    for (let i = 0; i < this.coords.length; i++) {
      let j = (i + 1) % this.coords.length;
      let c1 = this.coords[i];
      let c2 = this.coords[j];
      let z = lineEq(c1, c2);
      let smallerVal = Math.min(c1[0], c2[0]);
      let largerVal = Math.max(c1[0], c2[0]);
      while (smallerVal < largerVal) {
        smallerVal += 15;
        let zVal = z(smallerVal);
        appendGrass(smallerVal, zVal);
      }
    }
  }
  Update() {
    this.Collision();
    // console.log(this.collidableObjs)
  }
  //? try detecting collision with the origin being the shoes
  //? For smaller objs, and I can't be bothered to rewrite..maybe when refactoring.
  private Collision() {
    // let raycaster = new Raycaster(this.character.position.clone())
    // let col = raycaster.intersectObjects(this.collidableObjs)
    // let char: any = this.character.clone().children[1].children[2]; //.geometry.attributes.position.array
    // let pver: [] =
    //   char.geometry.attributes.position.array;
    // let vecs = [];
    // for (let i = 0; i < pver.length / 3; i++) {
    //   let v = new Vector3(pver[i * 3], pver[i * 3 + 1], pver[i * 3 + 2]);
    //   let wv = this.character.localToWorld(v)
    //   vecs.push(wv);
    // }
    // // this.character.localToWorld()
    // for(let i = 0; i < vecs.length; i++){
    //     let vert = vecs[i].applyMatrix4(char.matrix)
    //     let dirVect = vert.sub(this.character.position)
    //     console.log(dirVect)
    // }

    // console.log(vecs[0].applyMatrix4(char.matrix));
    // console.log(char.matrix)
  }
}

// export class Collisions{
//   constructor(){
//     this.character = character

//     this.Init()
//   }
//   Init(){
//     let ray = new Ray(this.character.position,)
//   }
// }
