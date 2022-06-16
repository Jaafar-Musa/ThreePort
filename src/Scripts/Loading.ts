import * as THREE from "three";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader";
import MyHtml from "../html/Index";
// import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

export interface IAnimation {
  [name:string]: THREE.AnimationAction
}
export interface IObjs{
  [name:string]: THREE.Group
}
export class Loading {
  public character!: THREE.Group;
  private fbxLoader: FBXLoader;
  public Html: MyHtml;
  public manager: THREE.LoadingManager;
  public animations:IAnimation = {}
  public mixer!: THREE.AnimationMixer;
  public Objs :IObjs = {}

  constructor() {
    this.Html = new MyHtml();
    // ADD loading manager
    this.manager = new THREE.LoadingManager();
    this.fbxLoader = new FBXLoader(this.manager);
    this.fbxLoader.setPath("/src/assets/");

    this.Init();
    this.Html.AddLoadingPage();
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
        this.fbxLoader.load("animations/Walking.fbx", (a) => {
          this.GetAnimations("Walk", a);
        });
        this.fbxLoader.load("animations/Running.fbx", (a) => {
          this.GetAnimations("Run", a);
        });
        // setTimeout(()=>{
          this.fbxLoader.load("PineTree_1.fbx", (obj)=> this.LoadFBXModel("Tree", obj))
          this.fbxLoader.load("Grass_2.fbx", (obj)=> this.LoadFBXModel("Grass", obj))
          this.fbxLoader.load("languages/test2.fbx", (obj)=> this.LoadFBXModel("Py", obj))
          this.fbxLoader.load("languages/html.fbx", (obj)=> this.LoadFBXModel("Html", obj))
        // },10000)

      },
    );
  }

  private GetAnimations(name: string, animation: THREE.Group) {
    // const clip = this.mixer.clipAction(animation)
    const clip = animation.animations[0];
    const action = this.mixer.clipAction(clip);
    this.animations[name] = action
  }
  private LoadFBXModel(name: string, obj:THREE.Group){
    this.Objs[name] = obj
  }
}
