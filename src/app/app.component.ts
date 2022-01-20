import { animate, AnimationEvent, group, keyframes, state, style, transition, trigger } from '@angular/animations';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    trigger('divState', [
      state('normal', style({
        'background-color': 'red',
        transform: 'translateX(0)'
      })),
      state('highlighted', style({
        'background-color': 'blue',
        transform: 'translateX(100px)'
      })),
      transition('normal <=> highlighted', animate(300)),
      // transition('highlighted => normal', animate(800))
    ]),
    trigger('wildState', [
      state('normal', style({
        'background-color': 'red',
        transform: 'translateX(0) scale(1)'
      })),
      state('highlighted', style({
        'background-color': 'blue',
        transform: 'translateX(100px) scale(1)'
      })),
      state('shrunken', style({
        'background-color': 'green',
        transform: 'translateX(0) scale(0.5)'
      })),
      transition('normal => highlighted', animate(300)),
      transition('highlighted => normal', animate(800)),
      transition('shrunken <=> *', [
        style({
          'background-color': 'orange',
          'border-radius': '0px'
        }),
        animate(1000, style({
          'border-radius': '50px'
        })),
        animate(500)
      ])
    ]),
    trigger('list1', [
      state('in', style({ // Estado normal
        opacity: 1,
        transform: 'translateX(0)'
      })),
      transition('void => *', [
        style({ // Style separado da tempo -> ocorre imediatamente, e por 0,3s se transforma no estado normal
          opacity: 0,
          transform: 'translateX(-100px)'
        }),
        animate(300)
      ]),
      transition('* => void', [
        animate(300, style({ // Style acoplado ao tempo -> transição de 0,3s do estado normnal para esse style
          transform: 'translateX(100px)',
          opacity: 0
        }))
      ])
    ]),
    trigger('list2', [
      state('in', style({
        opacity: 1,
        transform: 'translateX(0)'
      })),
      transition('void => *', [
        animate(1000, keyframes([ // keyframe permite um array de styles ao invés de apenas 1
          style({
            transform: 'translateX(-100px)',
            opacity: 0,
            offset: 0 // o offset permite controlar o tempo de cada etapa (style) da nimação
          }),
          style({
            transform: 'translateX(-50px)',
            opacity: 0.5,
            offset: 0.3
          }),
          style({
            transform: 'translateX(-20px)',
            opacity: 1,
            offset: 0.8
          }),
          style({
            transform: 'translateX(0px)',
            opacity: 1,
            offset: 1
          })
        ]))
      ]),
      transition('* => void', [
        group([ // group permite setar mais de uma animação que iniciam em paralelo
          animate(300, style({
            color: 'red'
          })),
          animate(800, style({
            transform: 'translateX(100px)',
            opacity: 0
          }))
        ])
      ])
    ]),
  ]
})
export class AppComponent {
  state = 'normal';
  wildState = 'normal';
  list = ['Milk', 'Sugar', 'Bread'];

  onAnimate() {
    this.state = this.state == 'normal' ? 'highlighted' : 'normal';
    this.wildState = this.wildState == 'normal' ? 'highlighted' : 'normal';
  }

  onShrink() {
    // this.wildState = 'shrunken';
    this.wildState = this.wildState == 'normal' ? 'shrunken' : 'normal';
  }

  onAdd(item: string) {
    this.list.push(item);
  }

  onDelete(item: string) {
    this.list.splice(this.list.indexOf(item), 1);
  }

  animationStarted(event: AnimationEvent) {
    console.log(event);
  }

  animationEnded(event: AnimationEvent) {
    console.log(event);
  }
}
