import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AddDoctorComponent } from './doctors/add-doctor/add-doctor.component';
import { EditDoctorComponent } from './doctors/edit-doctor/edit-doctor.component';
import { ListDoctorsComponent } from './doctors/list-doctors/list-doctors.component';

const routes: Routes = [
  {
    'path' : '' , component: DashboardComponent
  },
  {
    path: 'doctors', component: ListDoctorsComponent,
    children: [
      { path: 'add', component: AddDoctorComponent },
      { path: 'edit/:id', component: EditDoctorComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
