import { IMovements } from "./Character";
import { IAnimation } from "./Loading";

interface IState {
  name: string;
  Enter: (previousState:IState | undefined) => void;
//   Exit: () => void;
  Update: (input:IMovements) => void;
}


abstract class FSM {
  private currentState: IState | undefined;
  public states: Map<string, IState > = new Map();
  public loadedAnimations:IAnimation
  constructor(animations:IAnimation) {
    this.currentState = undefined;
    this.loadedAnimations = animations
  }
  SetState(name: string) {
    let previousState = this.currentState;
    if (previousState) {
      if (previousState.name === name) {
        return;
      }
    //   previousState.Exit();
    }
    this.currentState = this.states.get(name)
    this.currentState?.Enter(previousState)
  }
  Update( input:IMovements){
      if(this.currentState){
          this.currentState.Update(input)
      }
  }
}
export class MyCharacterFSM extends FSM {
  constructor(animations:IAnimation) {
    super(animations);
    this.states.set("Idle", new Idle(this));
    this.states.set("Walk", new Walk(this));
    this.states.set("Run", new Run(this));
  }
}

class Idle implements IState {
  public name: string;
  private parent : FSM
  constructor(parent : FSM) {
    this.name = "Idle";
    this.parent = parent
  }
  Enter(previousState:IState | undefined): void {
      let animation = this.parent.loadedAnimations["Idle"]
      if(previousState){
        const prevAnim = this.parent.loadedAnimations[previousState.name]
        animation.time = 0.0;
        animation.enabled = true;
        animation.setEffectiveTimeScale(1.0);
        animation.setEffectiveWeight(1.0);
        animation.crossFadeFrom(prevAnim, 0.5, true);
        animation.play(); 
      }else{
          animation.play()
      }
  }
//   Exit(): void {}
  Update(inputs:IMovements): void {
      if(inputs.forward){
          this.parent.SetState("Walk")
      }
  }
}
class Walk implements IState {
  public name: string;
  private parent : FSM
  constructor(parent : FSM) {
    this.name = "Walk";
    this.parent = parent
  }
  Enter(previousState:IState | undefined): void {
      let animation = this.parent.loadedAnimations["Walk"]
      if(previousState){
        animation.enabled = true;
        const prevAnim = this.parent.loadedAnimations[previousState.name]
        if(previousState.name = "Run"){
          let r= animation.getClip().duration / prevAnim.getClip().duration
          animation.time = r * prevAnim.time
        }else{
          animation.time = 0.0;
          animation.setEffectiveTimeScale(1.0);
          animation.setEffectiveWeight(1.0);
        }
        animation.crossFadeFrom(prevAnim,0.1,true)
        animation.play()
      }else{
          animation.play()
      }
  }
//   Exit(): void {}
  Update(inputs:IMovements): void {
      if(!inputs.forward){
          this.parent.SetState("Idle")
      }else if(inputs.sprint){
          this.parent.SetState("Run")
      }
  }
}
class Run implements IState {
  public name: string;
  private parent : FSM
  constructor(parent : FSM) {
    this.parent = parent
    this.name = "Run";
  }
  Enter(previousState:IState|undefined): void {
    let animation = this.parent.loadedAnimations["Run"]
    
    if(previousState){
      animation.enabled = true
      let prevAnim = this.parent.loadedAnimations[previousState.name]
      if(previousState.name = "Walk"){
        let r= animation.getClip().duration / prevAnim.getClip().duration
        animation.time = r * prevAnim.time
      }else{
        animation.time = 0.0;
        animation.setEffectiveWeight(1.0)
        animation.setEffectiveTimeScale(1.0)
      }
      animation.crossFadeFrom(prevAnim,0.5,true)
      animation.play()
      // if(previousState.name == "Walk")
    }else{
      animation.play()
    }
  }
//   Exit(): void {}
  Update(inputs:IMovements): void {
      if(!inputs.sprint){
          if(inputs.forward){
              this.parent.SetState("Walk")
          }
          this.parent.SetState("Idle")
      }
  }
}
