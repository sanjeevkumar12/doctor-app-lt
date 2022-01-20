import { AfterViewInit, Directive, ElementRef, HostBinding, HostListener, Renderer2 } from '@angular/core'
import { Dropdown } from 'bootstrap'

@Directive({
    selector: '[appDropdown]',
})
export class DropdownDirective implements AfterViewInit {
    private menu!: Dropdown;

    constructor(public el: ElementRef, private rendrer: Renderer2) {

    }

    ngAfterViewInit(): void {
        this.menu = new Dropdown(this.el.nativeElement.querySelector('.dropdown-toggle'));
    }

    @HostListener('click')
    openMenu() {
        this.menu.show();
    }
    @HostListener('mouseover')
    openHoverMenu() {
        this.menu.show();
    }

    @HostListener('mouseleave')
    openLeaveMenu() {
        this.menu.hide();
    }
}