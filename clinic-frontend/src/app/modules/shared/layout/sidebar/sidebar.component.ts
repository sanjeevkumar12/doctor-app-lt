import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { NavigationService } from '../../services/sidebar.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  showSideNav: Observable<boolean>;

  constructor(private navService: NavigationService, private authService: AuthService, private router: Router) {
    this.showSideNav = this.navService.getShowNav();
  }

  ngOnInit(): void {
    this.showSideNav = this.navService.getShowNav();
  }

  logout() {
    this.authService.logout()
    this.router.navigate(['/login'])
  }
}
