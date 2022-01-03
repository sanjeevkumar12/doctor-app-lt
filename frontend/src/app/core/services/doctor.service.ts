import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import {environment} from '../../../environments/environment';
const DOCTOR_ENDPOINT = `${environment.apiUrl}/api/v1/doctors`
@Injectable({
  providedIn: 'root'
})
export class DoctorService {

  constructor(public http: HttpClient) { }

  listAll(){
    return this.http.get<any>(`${DOCTOR_ENDPOINT}`, {})
      .pipe(map(res => {
       console.log(res)
       return res
      }));
  }
  createDoc(data: any) {
    console.log(data)
    return this.http.post<any>(`${DOCTOR_ENDPOINT}`, data)
      .pipe(map(res => {
       return res
      }));
  }
}
