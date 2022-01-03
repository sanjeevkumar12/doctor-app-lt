import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../../core/services/auth.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isAuthenticated$ : Observable<boolean>;
  user : User|null;
  
  constructor(public authService: AuthService, private router: Router) {  
    this.isAuthenticated$ = authService.isAuthenticated
    this.user = authService.user
  }

  ngOnInit(): void {

  }

  logout(){
    this.authService.logout()
    this.router.navigate(['/login'])
  }

}
