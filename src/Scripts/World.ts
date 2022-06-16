import {
  Box3,
  Mesh,
  MeshPhongMaterial,
  PlaneGeometry,
} from "three";
import * as THREE from "three"
import { IObjs } from "./Loading";
import { repo } from "../repo";

// type Box3 = {
//   name:string
// }
export class World {
  private raycaster = new THREE.Raycaster()
  private mouse = new THREE.Vector2()
  private scene: THREE.Scene;
  private objs: IObjs;
  collidableObjs: Box3[] = [];
  interactables:THREE.Object3D[]=[]
  keypress:null | string = null
  private coords: [x: number, z: number][] = [
    [150, -260],
    [-150, -260],
    [-300, 0],
    [-150, 260],
    [150, 260],
    [300, 0],
  ];
  constructor(scene: THREE.Scene, objs: IObjs, ) {
    this.scene = scene;
    this.objs = objs;
    this.Init();
  }
  private Init() {
    this.AddFloor();
    // this.AddTrees();
    this.AddLanguages("Py");
    this.AddMapBoarder();
    // this.Collision()


    //Set up mouse 
    window.addEventListener('mousemove', (event)=>{
      this.mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
      this.mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
    
    }, false)
    window.addEventListener("keyup",(event)=>{
      switch(event.key){
        case "Enter":
        case "q":
        case "Q":
        case "E":
        case "e":
        case "Escape":
        case "Backspace":
          this.keypress = event.key   
      }
      console.log(event.key)
    }, false)

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

  public AddLanguages(name:string) {
    let language = this.objs[name];
    language.position.set(-180, 0, 0);
    language.scale.setScalar(0.2);
    language.rotateY(Math.PI / 2);
    // let box = new Box3();
    // box.setFromObject(language);
    language.name = name
    this.interactables.push(language);
    this.scene.add(language);

  }
  private UpdateMouse(camera:THREE.Camera){
    this.raycaster.setFromCamera( this.mouse,camera)
    // console.log()
    let intersectsWith = this.raycaster.intersectObjects(this.interactables)
    if(intersectsWith.length > 0){
      // console.log(repo)
      this.isLang()
      console.log(intersectsWith[0])

    }
  }
  isLang(){
    for(let a in repo){
      console.log(a)
    }
  }
  Update(camera:THREE.Camera){
    this.UpdateMouse(camera)
  }
    //? cos theta = x, sin theta = y
    // let r = 10;
    // let points: Vector3[] = [];
    // for (let i = 0; i < 360; i++) {
    //   let oneDeg = Math.PI;
    //   points.push(
    //     new Vector3(Math.sin(i * oneDeg) * r, Math.cos(i * oneDeg) * r, 0)
    //   );
    // }
    // circleGeo.setFromPoints(points);
    // // console.log(circleGeo)

    // let circle = new Line(circleGeo, circleMaterial);

    // // let loopCirc = new LineLoop(circleGeo,circleMaterial)

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
      cloneTree.castShadow = true
      let box = new Box3();

      // let m = new THREE.MeshBasicMaterial({color:0xffffff,wireframe:true})
      // let b = new THREE.Mesh(box,m)
      box.setFromObject(cloneTree);
      this.collidableObjs.push(box);
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


}
