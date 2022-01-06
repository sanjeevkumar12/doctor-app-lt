import { Component, OnInit } from '@angular/core';
import { DoctorService } from '../../core/services/doctor.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {


  doctors = [];
  constructor( public doctorService : DoctorService) { }

  ngOnInit(): void {
    this.doctorService.listAll().subscribe((res)=>{
      this.doctors = res
    })
  }

}
