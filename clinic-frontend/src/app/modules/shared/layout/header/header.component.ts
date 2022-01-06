import { Component, OnInit } from '@angular/core';
import { NavigationService } from '../../services/sidebar.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private navService: NavigationService
  ) { }

  ngOnInit(): void {
  }

  toggleSideNav() {
    this.navService.toggleNavState();
  }

}
