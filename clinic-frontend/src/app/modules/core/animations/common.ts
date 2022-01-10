import { trigger, state, style, animate, transition, keyframes } from '@angular/animations';

export const slideInOutAnimation =
    // trigger name for attaching this animation to an element using the [@triggerName] syntax
    trigger('slideInOutAnimation', [

        // end state styles for route container (host)
        state('*', style({
            // the view covers the whole screen with a semi tranparent background
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.8)'
        })),

        // route 'enter' transition
        transition(':enter', [

            // styles at start of transition
            style({
                // start with the content positioned off the right of the screen, 
                // -400% is required instead of -100% because the negative position adds to the width of the element
                right: '-400%',

                // start with background opacity set to 0 (invisible)
                backgroundColor: 'rgba(0, 0, 0, 0)'
            }),

            // animation and styles at end of transition
            animate('.5s ease-in-out', style({
                // transition the right position to 0 which slides the content into view
                right: 0,

                // transition the background opacity to 0.8 to fade it in
                backgroundColor: 'rgba(0, 0, 0, 0.8)'
            }))
        ]),

        // route 'leave' transition
        transition(':leave', [
            // animation and styles at end of transition
            animate('.5s ease-in-out', style({
                // transition the right position to -400% which slides the content out of view
                right: '-400%',

                // transition the background opacity to 0 to fade it out
                backgroundColor: 'rgba(0, 0, 0, 0)'
            }))
        ])
    ]);

export const darkShadowState = trigger('darkShadowState', [
    state('*', style({
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.8)'
    })),
    transition(':enter', [
        style({
            backgroundColor: 'rgba(0, 0, 0, 0)'
        }),
        animate('.5s ease-in-out', style({
            backgroundColor: 'rgba(0, 0, 0, 0.8)'
        }))
    ]),
    transition(':leave', [
        animate('.1s ease-in-out', style({
            backgroundColor: 'rgba(0, 0, 0, 0)'
        }))
    ])
])

export const bubbleGrowAnimation = trigger('bubbleGrowAnimation', [
    transition(':enter', [
        animate('250ms ease-in-out', keyframes([
            style({ transform: 'scale(0)' }),
            style({ transform: 'scale(1.1)' }),
            style({ transform: 'scale(1)' }),
        ]))
    ]),
    transition(':leave', [
        animate('250ms ease-in-out', keyframes([
            style({ transform: 'scale(1)' }),
            style({ transform: 'scale(1.1)' }),
            style({ transform: 'scale(0)' })
        ]))
    ]),
])