import { Injectable } from '@angular/core';
import { Animation, AnimationController, AnimationKeyFrames } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class AnimationService {
  constructor() {}
  private static animationCtrl = new AnimationController();

  static createAnimation(
    element: Element,
    duration: number = 2000,
    iterations: number = 1,
    fromTo: { property: string; fromValue: any; toValue: any },
    direction: 'normal' | 'reverse' | 'alternate' | 'alternate-reverse' = 'normal',
    easing: 'linear' | 'ease' | 'ease-in' | 'ease-out' | 'ease-in-out' | 'cubic-bezier',
    timingFunction?: [number, number, number, number]
  ): Animation {
    let EASING: string;
    if (easing === 'cubic-bezier') {
      EASING = `cubic-bezier(${timingFunction[0]}, ${timingFunction[1]}, ${timingFunction[2]}, ${timingFunction[3]})`;
    } else {
      EASING = easing;
    }
    return this.animationCtrl
      .create()
      .addElement(element)
      .duration(duration)
      .iterations(iterations)
      .fromTo(fromTo.property, fromTo.fromValue, fromTo.toValue)
      .direction(direction)
      .easing(EASING);
  }

  static createKeyFramedAnimation(
    element: Element,
    duration: number = 2000,
    iterations: number = 1,
    keyFrames: AnimationKeyFrames,
    direction: 'normal' | 'reverse' | 'alternate' | 'alternate-reverse' = 'normal',
    easing: 'linear' | 'ease' | 'ease-in' | 'ease-out' | 'ease-in-out' | 'cubic-bezier',
    timingFunction?: [number, number, number, number]
  ): Animation {
    let EASING: string;
    if (easing === 'cubic-bezier') {
      EASING = `cubic-bezier(${timingFunction[0]}, ${timingFunction[1]}, ${timingFunction[2]}, ${timingFunction[3]})`;
    } else {
      EASING = easing;
    }
    return this.animationCtrl
      .create()
      .addElement(element)
      .duration(duration)
      .iterations(iterations)
      .direction(direction)
      .easing(EASING)
      .keyframes(keyFrames);
  }

  static createGroupedAnimations(
    duration: number = 2000,
    iterations: number = 1,
    ...animations: Animation[]
  ): Animation {
    return this.animationCtrl.create().duration(duration).iterations(iterations).addAnimation(animations);
  }

  static async playChainedAnimations(...animations: Animation[]): Promise<void> {
    for (const animation of animations) {
      await animation.play();
    }
  }
}
