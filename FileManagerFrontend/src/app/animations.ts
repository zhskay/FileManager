import { trigger, state, style, transition, animate } from '@angular/animations';

const ANIMATION_TIMINGS = '400ms cubic-bezier(0.25, 0.8, 0.25, 1)';

export const fade = trigger('fade', [
    state('fadeOut', style({ opacity: 0 })),
    state('fadeIn', style({ opacity: 1 })),
    transition('* => fadeIn', animate(ANIMATION_TIMINGS))
]);

export const slideContent = trigger('slideContent', [
    state('void', style({ transform: 'translate3d(0, 25%, 0) scale(0.9)', opacity: 0 })),
    state('enter', style({ transform: 'none', opacity: 1 })),
    state('leave', style({ transform: 'translate3d(0, 25%, 0)', opacity: 0 })),
    transition('* => *', animate(ANIMATION_TIMINGS)),
]);