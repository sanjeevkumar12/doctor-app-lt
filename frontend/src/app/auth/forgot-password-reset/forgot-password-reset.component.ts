import { DOCUMENT } from '@angular/common';
import { Route } from '@angular/compiler/src/core';
import { Component, Inject, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-forgot-password-reset',
  templateUrl: './forgot-password-reset.component.html',
  styleUrls: ['./forgot-password-reset.component.css']
})
export class ForgotPasswordResetComponent implements OnInit, OnDestroy {
  form : FormGroup;
  submitted: boolean = false;
  authError: string|null = null;

  constructor(@Inject(DOCUMENT) private document: any, private authService : AuthService,private formBuilder: FormBuilder,
    private router: Router, private route : ActivatedRoute) 
    { 
      this.document.body.classList.add('app-reset-password');
      this.document.body.classList.add('p-0')
      this.form = this.formBuilder.group({
      password: ['', Validators.required],
      confirm_password: ['', Validators.required],

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
    if(this.form.valid){
      const query_params = this.route.snapshot.queryParams;
      this.authService.forgot_password_reset(this.f.password.value, this.f.confirm_password.value, query_params.token, query_params.hash).subscribe((res) => {
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
