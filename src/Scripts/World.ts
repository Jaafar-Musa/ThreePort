import {
  Box3,
  Mesh,
  MeshPhongMaterial,
  PlaneGeometry,
} from "three";
import { IObjs } from "./Loading";

export class World {
  private scene: THREE.Scene;
  private objs: IObjs;
   collidableObjs: Box3[] = [];
  private coords: [x: number, z: number][] = [

    [150, -260],
    [-150, -260],
    [-300, 0],
    [-150, 260],
    [150, 260],
    [300,0],
  ];
  constructor(scene: THREE.Scene, objs: IObjs, ) {
    this.scene = scene;
    this.objs = objs;
    this.Init();
  }
  private Init() {
    this.AddFloor();
    // this.AddTrees();
    this.AddObj()
    this.AddMapBoarder();
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
  private AddObj() {
    let tree = this.objs["py"];
    tree.position.set(0, 0, 40);
    tree.scale.setScalar(0.5);
    let box = new Box3()
    box.setFromObject(tree)
    this.collidableObjs.push(box);
    this.scene.add(tree);
  }
  private AddMapBoarder() {
    //Boarder the map in trees
    //In a hex shape

    //Get the eq of the 6lines
    let lineEq = (c1: [x: number, z: number], c2: [x: number, z: number]) => {
      let m = (c2[1] - c1[1]) / (c2[0] - c1[0]);
      let eq = (val: number) => m * (val - c2[0]) + c2[1];
      return eq;
    };
    //add the tree along the line
    let appendTree = (x: number, z: number) => {
      let tree = this.objs["Tree"];
      let cloneTree = tree.clone();
      cloneTree.position.set(x, 0, z);
      cloneTree.scale.setScalar(0.3);
      let box = new Box3()
      box.setFromObject(cloneTree)
      this.collidableObjs.push(box)
      this.scene.add(cloneTree);
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
        appendTree(smallerVal, zVal);
      }
    }
  }
  // Update() {
  //   this.Collision();
  //   // console.log(this.collidableObjs)
  // }
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
