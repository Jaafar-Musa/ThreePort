import "./css/style.css";
import { Loading, MyCamera, Character, World } from "./Scripts";

import * as THREE from "three";

class Main {
  public scene: THREE.Scene;
  private renderer: THREE.WebGLRenderer;
  private MyCamera!: MyCamera;
  private Character!: Character;
  private world!: World;
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
    this.scene.background = new THREE.Color(0xc6fcff);

    // Loading done
    this.Loading.manager.onLoad = () => {
      console.log("loaded");
      this.RenderItems();
    };
  }

  private RenderItems(): void {
    
    this.world = new World(this.scene, this.Loading.Objs);
    this.Character = new Character(
      this.Loading.character,
      this.scene,
      this.Loading.animations,
      this.world
      );
      this.MyCamera = new MyCamera(this.scene, this.Character.character);

    // new Collisions(this.Character.character)


    // this.AddLight_(0, 10, 2);
    //Request animation

      let light = new THREE.DirectionalLight(0xffffff,1.2)
      light.position.set(0,40,260)
      light.target.position.set(0,0,0)
      light.castShadow = true
      light.shadow.bias = -0.001;
      // light.shadow.mapSize.width = 4096;
      // light.shadow.mapSize.height = 4096;
      // light.shadow.camera.far = 200.0;
      // light.shadow.camera.near = 1.0;
      // light.shadow.camera.left = 50;
      // light.shadow.camera.right = -50;
      // light.shadow.camera.top = 50;
      // light.shadow.camera.bottom = -50;
      this.scene.add(light)
    // this.scene.add(new THREE.AmbientLight(0xffffff, 0.1));
    this.scene.add(new THREE.HemisphereLight(0xB1E1FF,0x3f9b0b,1.2))

    this.RAF();

    // Responsive
    window.addEventListener("resize", () => this.OnWindowResize());

    //start
    let btn = document.querySelector<HTMLButtonElement>("button");
    btn!.disabled = false;
    btn?.addEventListener("click", () => {
      this.Loading.Html.RemoveLoadingBtn();
    });

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
    this.world.Update(this.MyCamera.camera)
  }

  private OnWindowResize(): void {
    this.MyCamera.camera.aspect = window.innerWidth / window.innerHeight;
    this.MyCamera.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  new Main();
});
