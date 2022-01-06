import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment} from '../../../environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { TokenStorageService } from './token-storage.service';
import { User } from '../../models/user.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public isAuthenticated$ = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient, private tokenStorage: TokenStorageService) {
      
   }

   checkAuthenticated(){
     const token = this.tokenStorage.getToken()
     if (token){
       this.isAuthenticated$.next(true)
     }
     return !!token;
   }

   get user(): User|null{
     return this.tokenStorage.getUser();
   }

   get isAuthenticated(){
     return this.isAuthenticated$.asObservable();
   }

   login(email: string, password: string) {
    return this.http.post<any>(`${environment.apiUrl}/api/v1/auth/login`, {email, password})
      .pipe(map(user => {
        this.tokenStorage.saveToken(user.token)
        this.tokenStorage.saveUser(user.user)
        this.isAuthenticated$.next(true);
        return user;
      }));
  }

  register(email: string, password: string, confirm_password: string, first_name: string, last_name: string) : Observable <any> {
    return this.http.post(`${environment.apiUrl}/api/v1/auth/register`, {email, password, first_name, last_name, confirm_password});
  }
  
  forgot_password_link(email: string, client_url: string){
    return this.http.post(`${environment.apiUrl}/api/v1/auth/forgot-password`, {email, client_url});
  }

  forgot_password_reset(new_password: string, confirm_password: string, token: string, hash: string){
    return this.http.post(`${environment.apiUrl}/api/v1/auth/forgot-password/${token}/reset/${hash}`, {new_password, confirm_password});
  }

  logout(){
    this.tokenStorage.signOut()
  }
  change_password(current_password: string, new_password: string, confirm_password: string){
    return this.http.post(`${environment.apiUrl}/api/v1/auth/change-password`, {current_password, new_password, confirm_password});
  }

}
