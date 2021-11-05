import "./css/style.css";
import { Loading, MyCamera, Character } from "./Scripts";

import * as THREE from "three";

class Main {
  public scene: THREE.Scene;
  private renderer: THREE.WebGLRenderer;
  private MyCamera: MyCamera;
  private Character!: Character;
  private Loading: Loading;
  private previousRAF: number|null;

  constructor() {
    this.scene = new THREE.Scene();
    this.renderer = new THREE.WebGLRenderer({
      canvas: document.querySelector<HTMLCanvasElement>("#three-canvas")!,
      antialias: true,
    });
    this.MyCamera = new MyCamera(this.scene);
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
    this.scene.background = new THREE.Color(0x348c31);

    // Responsive
    window.addEventListener("resize", () => this.OnWindowResize());

    //Request animation
    this.RAF();

    // Loading done
    this.Loading.manager.onLoad = ()=>{
      let btn = document.querySelector<HTMLButtonElement>("button");
      btn!.disabled = false
      btn?.addEventListener("click",()=>{this.RenderItems(); this.Loading.Html.RemoveLoadingBtn()})
    }
  }

  private RenderItems(): void {
    this.Character = new Character(this.Loading.character, this.scene, this.Loading.animations);
    this.AddLight_(0, 5, 2);
  }

  private RAF(): void {
    window.requestAnimationFrame((t) => {
      if(this.previousRAF === null){
        this.previousRAF = t
      }
      this.RAF();
      this.Step(t - this.previousRAF)
      this.renderer.render(this.scene, this.MyCamera.camera);
      this.previousRAF = t
    });
  }
  private Step(t:number){
    let tS = t * 0.001
    if(this.Loading.mixer){
      this.Loading.mixer.update(tS)
    }
  }

  private OnWindowResize(): void {
    this.MyCamera.camera.aspect = window.innerWidth / window.innerHeight;
    this.MyCamera.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }

  private AddLight_(...pos: number[]) {
    const color = 0xffffff;
    const intensity = 1;
    const light = new THREE.DirectionalLight(color, intensity);
    light.position.set(pos[0], pos[1], pos[2]);
    this.scene.add(light);
    this.scene.add(light.target);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  new Main();
});
