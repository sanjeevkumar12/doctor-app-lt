import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { AuthService } from './core/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  showHeader = false;
  showSidebar = false;
  showFooter = false;
  isAuthenticated = false;

  constructor(private router: Router, private activatedRoute: ActivatedRoute, public authService: AuthService) {
    this.authService.isAuthenticated.subscribe(
      (isAuthenticated: boolean) => this.isAuthenticated = isAuthenticated
    );
  }

  ngOnInit() {

    this.isAuthenticated = this.authService.checkAuthenticated();
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.showHeader = this.activatedRoute.firstChild!.snapshot.data.showHeader !== false;
        this.showSidebar = this.activatedRoute.firstChild!.snapshot.data.showSidebar !== false;
        this.showFooter = this.activatedRoute.firstChild!.snapshot.data.showFooter !== false;
      }
    });
  }

}
