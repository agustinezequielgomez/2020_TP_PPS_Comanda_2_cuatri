import { AnimationService } from '../Services/animation.service';
import { Animation } from '@ionic/angular';

export const routingAnimation = (baseEl: HTMLElement, opts?: any): Animation => {
    const ENTERING_ANIMATION = AnimationService.
    createKeyFramedAnimation(opts.enteringEl, 500, 1, [
        {offset: 0, transform: 'translateX(50px)'},
        {offset: 0, opacity: 0},
        {offset: 1, transform: 'translateX(0px)'},
        {offset: 1, opacity: 1},
    ], 'normal', 'cubic-bezier', [0.390, 0.575, 0.565, 1.000]);

    const LEAVE_ANIMATION = AnimationService.
    createAnimation(opts.leavingEl, 500, 1,
                    {property: 'opacity', fromValue: 1, toValue: 0},
                    'normal', 'ease-in-out');

    return AnimationService.createGroupedAnimations(600, 1, ENTERING_ANIMATION, LEAVE_ANIMATION);
}