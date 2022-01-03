import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit, OnDestroy {
  form : FormGroup;
  submitted: boolean = false;
  authError: string|null = null;

  constructor(@Inject(DOCUMENT) private document: any, private authService : AuthService,private formBuilder: FormBuilder,
    private router: Router) 
    { 
      this.document.body.classList.add('app-reset-password');
      this.document.body.classList.add('p-0')
      this.form = this.formBuilder.group({
      email: ['', Validators.email],

  });
}

  ngOnInit(): void {
  
  }

  ngOnDestroy(){
    this.document.body.classList.remove('app-reset-password');
    this.document.body.classList.remove('p-0')
  }


  get f() { return this.form.controls; }

  sendLink(){
    this.submitted = true;
    console.log(this.form.valid)
    const client_url = window.location.origin + this.router.createUrlTree(['auth/forgot-password/reset'])
    if(this.form.valid){
      this.authService.forgot_password_link(this.f.email.value, client_url).subscribe((res) => {
        this.router.navigate(['/login'])
      }, response => {
        if(response.status==422){
          this.handleSubmitError(response.error)
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

}
