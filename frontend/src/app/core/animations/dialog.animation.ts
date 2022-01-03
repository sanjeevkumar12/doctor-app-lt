import { trigger, state, query , sequence, style, animate, transition ,animateChild } from '@angular/animations';

export const dialogAnimation = trigger('dialog', [
    transition('void => *', [
        style({ opacity: 0, transform: 'scale(0.0)'  }),
        sequence([
            animate('1ms', style({ opacity: 1 })),
            animate('100ms ease-in', style({ transform: 'scale(1)' }))
        ])
    ]),
    transition('* => void', [
      animate(100, style({ transform: 'scale3d(.0, .0, .0)' }))
    ])
  ])

export const fadeInGrow = trigger('fadeInGrow', [
    transition(':enter', [
        query(':enter', [
            style({ opacity: 0, transform: 'scale(0.8)'  }),
            sequence([
                animate('1ms', style({ opacity: 1 })),
                animate('500ms ease-in', style({ transform: 'scale(1)' }))
            ])
        ])
    ])
])

export const boxAnimation = [
    trigger('host', [
      transition(':leave', [
        query('@backdrop,@box', [
          animateChild()
        ])
      ]),
      transition(':enter', [
        query('@backdrop,@box', [
          animateChild()
        ])
      ]),
    ]),
    trigger('box', [
      transition(':leave', [
        style({
          transform: 'scale(1)'
        }),
        animate('100ms ease-out', style({
          transform: 'scale(1.2)'
        })),
        animate('300ms ease-in', style({
          transform: 'scale(0)'
        }))
      ]),
      transition(':enter', [
        style({
          transform: 'scale(0.5)'
        }),
        animate('200ms ease-out', style({
          transform: 'scale(1.2)'
        })),
        animate('100ms ease-out', style({
          transform: 'scale(1)'
        }))
      ]),
    ]),
    trigger('backdrop', [
      transition(':leave', [
        style({
          opacity: 1,
        }),
        animate('230ms ease-in', style({
          opacity: 0,
        }))
      ]),
      transition(':enter', [
        style({
          opacity: 0,
        }),
        animate('230ms ease-in', style({
          opacity: 1,
        }))
      ]),
    ])
  ]
