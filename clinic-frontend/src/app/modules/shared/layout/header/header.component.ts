import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { NavigationService } from '../../services/sidebar.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  private user: any;

  constructor(private navService: NavigationService, private authService: AuthService, private router: Router
  ) {
    this.user = authService.user
  }

  ngOnInit(): void {
  }

  toggleSideNav() {
    this.navService.toggleNavState();
  }

  logout() {
    this.authService.logout()
    this.router.navigate(['/login'])
  }

}
