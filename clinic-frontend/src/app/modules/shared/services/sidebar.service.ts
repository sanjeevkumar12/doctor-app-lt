import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NavigationService implements OnInit {

  private showNav$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);

  constructor() { }

  ngOnInit(): void {

  }
  getShowNav() {
    return this.showNav$.asObservable();
  }

  setShowNav(showHide: boolean) {
    console.log(showHide)
    this.showNav$.next(showHide);
  }

  toggleNavState() {
    this.showNav$.next(!this.showNav$.value);
  }

  isNavOpen() {
    return this.showNav$.value;
  }
}
