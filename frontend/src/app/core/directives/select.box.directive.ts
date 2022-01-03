import {
    Directive,
    ElementRef,
    HostListener,
    Inject,
    Input,
    Renderer2
} from '@angular/core';
import SlimSelect from 'slim-select'
  
@Directive({
  selector: '.appHighlight'
})
export class SelectBoxDirective {
    constructor(private el: ElementRef,
        private renderer: Renderer2) {
        debugger
    //noinspection TypeScriptUnresolvedVariable,TypeScriptUnresolvedFunction
    renderer.setStyle(el.nativeElement, 'backgroundColor', 'gray');
    }

    constructor1(

       
        
    ) {
            debugger
            console.log(this.el.nativeElement)
            new SlimSelect({
                select: this.el.nativeElement
            }) 
    
      }
}