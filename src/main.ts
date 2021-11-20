import "./css/style.css";
import { Loading, MyCamera, Character, World, } from "./Scripts";

import * as THREE from "three";

class Main {
  public scene: THREE.Scene;
  private renderer: THREE.WebGLRenderer;
  private MyCamera!: MyCamera;
  private Character!: Character;
  private world !: World
  private Loading: Loading;
  private previousRAF: number | null;

  constructor() {
    this.scene = new THREE.Scene();
    this.renderer = new THREE.WebGLRenderer({
      canvas: document.querySelector<HTMLCanvasElement>("#three-canvas")!,
      antialias: true,
    });
    this.Loading = new Loading();
    this.previousRAF = null;

    this.Init();
    // this.LoadEntities();
  }
  private Init() {
    // Config renderer
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(window.innerWidth, window.innerHeight);

    // Config scene
    this.scene.background = new THREE.Color(0xC6FCFF);

    // Loading done
    this.Loading.manager.onLoad = () => {
      let btn = document.querySelector<HTMLButtonElement>("button");
      btn!.disabled = false;
      btn?.addEventListener("click", () => {
        this.RenderItems();
        this.Loading.Html.RemoveLoadingBtn();
      });
    };
  }

  private RenderItems(): void {
    this.Character = new Character(
      this.Loading.character,
      this.scene,
      this.Loading.animations
    );

    this.world=  new World(this.scene,this.Loading.Objs,this.Character.character)
    // new Collisions(this.Character.character)

    this.MyCamera = new MyCamera(this.scene, this.Character.character)

    // this.AddLight_(0, 10, 2);
      this.scene.add(new THREE.AmbientLight(0xffffff,2))
    //Request animation
    this.RAF();

    // Responsive
    window.addEventListener("resize", () => this.OnWindowResize());

    //* REFERENCE A CUBE FOR TESTING PURPOSES
    const CubeMaterial = new THREE.MeshBasicMaterial({ color: 0x00ee0 });
    const CubeGeometry = new THREE.BoxGeometry();
    const cube = new THREE.Mesh(CubeGeometry, CubeMaterial);
    cube.position.set(-6, 0, 150);
    cube.add(new THREE.AxesHelper(10));
    // console.log(cube)
    this.scene.add(cube);
  }

  private RAF(): void {
    window.requestAnimationFrame((t) => {
      if (this.previousRAF === null) {
        this.previousRAF = t;
      }
      this.RAF();
      this.Step(t - this.previousRAF);
      this.renderer.render(this.scene, this.MyCamera.camera);
      this.previousRAF = t;
    });
  }
  private Step(t: number) {
    let tS = t * 0.001;
    // if()
    if (this.Character) {
      this.Character.Update(t);
    }
    if (this.Loading.mixer) {
      this.Loading.mixer.update(tS);
    }
    if (this.MyCamera) {
      this.MyCamera.Update(t);
    }
    this.world.Update()
  }

  private OnWindowResize(): void {
    this.MyCamera.camera.aspect = window.innerWidth / window.innerHeight;
    this.MyCamera.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }

  // private AddLight_(...pos: number[]) {
  //   const color = 0xffffff;
  //   const intensity = 1;
  //   const light = new THREE.DirectionalLight(color, intensity);
  //   light.position.set(pos[0], pos[1], pos[2]);
  //   light.target.position.set(1,1,1)
  //   this.scene.add(light);
  // }
}

document.addEventListener("DOMContentLoaded", () => {
  new Main();
});
