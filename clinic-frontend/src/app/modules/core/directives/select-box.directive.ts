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
  selector: '[appSelectBox]'
})
export class SelectBoxDirective {
  constructor(Element: ElementRef) {
    new SlimSelect({
      select: Element.nativeElement
    })
  }
}
