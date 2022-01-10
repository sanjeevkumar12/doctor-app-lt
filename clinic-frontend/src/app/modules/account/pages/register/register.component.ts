import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/modules/shared/services/auth.service';
import { TokenStorageService } from 'src/app/modules/shared/services/token-storage.service';



@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit, OnDestroy {

  form: FormGroup;
  authError: string | null = null;
  submitted: boolean = false;

  constructor(@Inject(DOCUMENT) private document: any, private authService: AuthService, private formBuilder: FormBuilder,
    private tokenService: TokenStorageService, private router: Router
  ) {
    const PAT_NAME = "^[a-zA-Z ]{2,20}$";
    this.form = this.formBuilder.group({
      email: ['', Validators.email],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirm_password: [''],
      first_name: ['', [Validators.required, Validators.pattern(PAT_NAME)]],
      last_name: [''],
    });
  }

  ngOnInit(): void {
  }
  get f(): { [key: string]: AbstractControl; } { return this.form.controls; }

  register() {
    this.submitted = true;
    if (this.form.valid) {
      this.authService.register(this.f['email'].value, this.f['password'].value,
        this.f['confirm_password'].value, this.f['first_name'].value, this.f['last_name'].value).subscribe({
          next: (res: any) => {
            console.log(res)
            this.router.navigate(['/login'])
          }, error: (response: any) => {
            if (response.status == 422) {
              this.handleSubmitError(response.error)
            }
          }
        });
    }
  }

  protected handleSubmitError(error: any) {
    const validationErrors = error.errors;
    console.log(validationErrors)
    Object.keys(validationErrors).forEach(prop => {
      const formControl = this.form.get(prop);
      if (formControl) {
        formControl.setErrors({
          server_error: validationErrors[prop]
        });
      }
    });
  }

  ngOnDestroy() {

  }


}