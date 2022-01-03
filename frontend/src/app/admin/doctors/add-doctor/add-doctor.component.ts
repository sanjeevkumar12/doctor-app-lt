import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';

import { slideInOutAnimation } from '../../../core/animations';
import { DoctorService } from '../../../core/services/doctor.service';
import { DAValidators } from '../../../core/forms/validations';
import { ConfigService } from '../../../core/services/config.service';


@Component({
  selector: 'app-add-doctor',
  templateUrl: './add-doctor.component.html',
  styleUrls: ['./add-doctor.component.css'],
  animations: [slideInOutAnimation],
  host: { '[@slideInOutAnimation]': '' }
})
export class AddDoctorComponent implements OnInit {

  title: string = '';
  form: FormGroup;
  submitted: boolean = false;
  medical_services : any;
  medical_specialties : any;

  constructor(private doctorService: DoctorService,private configService: ConfigService, private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      first_name: ['', [Validators.required, Validators.min(3), Validators.max(30)]],
      last_name: ['',[Validators.min(3), Validators.max(30)]],
      email: ['', [Validators.required,Validators.email]],
      password: ['', [Validators.required,DAValidators.validate_password]],
      confirm_password: ['', [Validators.required]],
      license: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
      phone_number: ['', [Validators.required, DAValidators.validate_phonenumber]],
      available_service: ['', [Validators.required]],
      medical_specialities: ['', [Validators.required]],
      date_of_birth: ['', [Validators.required]],
    },
    {
      validators: [DAValidators.matchPassword('password', 'confirm_password')]
    }
    );
    this.medical_specialties = this.configService.getDoctorConfigValue('medical_specialties', [])
    this.medical_services = this.configService.getDoctorConfigValue('medical_services',[])
  }

  ngOnInit(): void {
    this.title = 'Add Doctor'
  }

  get f() { return this.form.controls; }

  handleForm() {
    this.submitted = true;
    if(this.form.valid){
      this.doctorService.createDoc(this.form.value).subscribe((res) => {
        console.log(res)
      }, response => {
        if(response.status==422){
          this.handleSubmitError(response.error)
        }
      });
    }
    else {
      console.log(this.f.license.errors)
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
