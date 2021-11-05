import * as THREE from "three";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader";
import MyHtml from "../html/Index";
// import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

export interface IAnimation {
  [name:string]: THREE.AnimationAction
}

export class Loading {
  public character!: THREE.Group;
  private fbxLoader: FBXLoader;
  public Html: MyHtml;
  public manager: THREE.LoadingManager;
  public animations: IAnimation[] = []
  public mixer!: THREE.AnimationMixer;

  constructor() {
    this.Html = new MyHtml();
    // ADD loading manager
    this.manager = new THREE.LoadingManager();
    this.fbxLoader = new FBXLoader(this.manager);
    this.fbxLoader.setPath("/src/assets/");

    this.Init();
    this.Html.AddLoadingBtn();
  }

  private Init() {
    this.fbxLoader.load(
      "ty.fbx",
      (obj) => {
        this.character = obj;
        this.mixer = new THREE.AnimationMixer(this.character);

        //Load animations
        this.fbxLoader.load("animations/Idle.fbx", (a) => {
          this.GetAnimations("Idle", a);
        });
        this.fbxLoader.load("animations/Reaction.fbx", (a) => {
          this.GetAnimations("Reaction", a);
        });
      },
    );
  }

  private GetAnimations(name: string, animation: THREE.Group) {
    // const clip = this.mixer.clipAction(animation)
    const clip = animation.animations[0];
    const action = this.mixer.clipAction(clip);
    this.animations.push({[name]:action})
  }
}
