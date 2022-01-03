import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AuthService } from '../../core/services/auth.service';
import { DialogContext } from '../../dialog/dialog-config';
import { DialogRef } from '../../dialog/dialog-ref';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  form : FormGroup;
  authError: any;
  submitted: boolean = false;
  constructor(public config: DialogContext, public dialog: DialogRef, private formBuilder: FormBuilder, private authService: AuthService) {
    this.form = this.formBuilder.group({
      current_password: ['', Validators.required],
      new_password: ['', Validators.required],
      confirm_password: ['', Validators.required],

  });
   }

  ngOnInit(): void {
    
  }

  get f() { return this.form.controls; }

  onClose() {
    this.dialog.close('some value');
  }

  onSave(){
    this.submitted = true;
    if(this.form.valid){
      this.authService.change_password(this.f.current_password.value, this.f.new_password.value,  this.f.confirm_password.value)
      .subscribe(
        data => {
          this.onClose()
        },
        error => {
          if(error.status==422){
            this.handleSubmitError(error.error)
          }
        });
    }
  }

  protected handleSubmitError(error: any) {
    console.log(error)
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
