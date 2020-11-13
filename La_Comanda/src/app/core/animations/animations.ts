import { AnimationService } from '../Services/animation.service';
import { Animation } from '@ionic/angular';

export const routingAnimation = (baseEl: HTMLElement, opts?: any): Animation => {
  if (opts.direction === 'forward') {
    const ENTERING_ANIMATION = AnimationService.createKeyFramedAnimation(
      opts.enteringEl,
      900,
      1,
      [
        { offset: 0, transform: 'translateX(100%)' },
        { offset: 0, opacity: 0 },
        { offset: 1, transform: 'translateX(0%)' },
        { offset: 1, opacity: 1 },
      ],
      'normal',
      'cubic-bezier',
      [0.39, 0.575, 0.565, 1.0]
    );

    const LEAVE_ANIMATION = AnimationService.createKeyFramedAnimation(
      opts.leavingEl,
      900,
      1,
      [
        { offset: 0, transform: 'translateX(0%)' },
        { offset: 0, opacity: 1 },
        { offset: 1, transform: 'translateX(-100%)' },
        { offset: 1, opacity: 0 },
      ],
      'normal',
      'cubic-bezier',
      [0.39, 0.575, 0.565, 1.0]
    );
    return AnimationService.createGroupedAnimations(900, 1, ENTERING_ANIMATION, LEAVE_ANIMATION);
  } else {
    const ENTERING_ANIMATION = AnimationService.createKeyFramedAnimation(
      opts.enteringEl,
      900,
      1,
      [
        { offset: 0, transform: 'translateX(-100%)' },
        { offset: 0, opacity: 0 },
        { offset: 1, transform: 'translateX(0%)' },
        { offset: 1, opacity: 1 },
      ],
      'normal',
      'cubic-bezier',
      [0.39, 0.575, 0.565, 1.0]
    );

    const LEAVE_ANIMATION = AnimationService.createKeyFramedAnimation(
      opts.leavingEl,
      900,
      1,
      [
        { offset: 0, transform: 'translateX(0%)' },
        { offset: 0, opacity: 1 },
        { offset: 1, transform: 'translateX(100%)' },
        { offset: 1, opacity: 0 },
      ],
      'normal',
      'cubic-bezier',
      [0.39, 0.575, 0.565, 1.0]
    );
    return AnimationService.createGroupedAnimations(900, 1, ENTERING_ANIMATION, LEAVE_ANIMATION);
  }
};
