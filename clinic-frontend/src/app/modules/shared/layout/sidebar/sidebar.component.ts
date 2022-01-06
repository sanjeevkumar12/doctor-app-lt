import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { NavigationService } from '../../services/sidebar.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  showSideNav: Observable<boolean>;

  constructor(private navService: NavigationService) {
    this.showSideNav = this.navService.getShowNav();
  }

  ngOnInit(): void {
    this.showSideNav = this.navService.getShowNav();
  }

}
