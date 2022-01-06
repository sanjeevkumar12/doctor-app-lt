import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { TokenStorageService } from '../../../shared/services/token-storage.service';
import { AuthService } from '../../../shared/services/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  form: FormGroup;
  authError: string | null = null;
  returnUrl: string = '/'


  constructor(@Inject(DOCUMENT) private document: any, private authService: AuthService, private formBuilder: FormBuilder,
    private tokenService: TokenStorageService, private router: Router, private route: ActivatedRoute,
  ) {
    this.form = this.formBuilder.group({
      email: ['', Validators.email],
      password: ['']
    });
  }

  ngOnInit(): void {

    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  get f() { return this.form.controls; }

  login() {
    if (this.form.valid) {
      this.authService.login(this.f['email'].value, this.f['password'].value)
        .pipe(first())
        .subscribe(
          data => {
            this.router.navigate([decodeURIComponent(this.returnUrl)]);
          },
          error => {
            if (error.status == 422) {
              this.authError = error.error.errors.auth_error;
            }
          });
    }
  }
  ngOnDestroy() {

  }

}