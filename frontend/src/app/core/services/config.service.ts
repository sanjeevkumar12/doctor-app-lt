import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment} from '../../../environments/environment';
import { Observable } from 'rxjs';
import { mapTo, tap } from 'rxjs/operators';


@Injectable({
    providedIn: 'root'
})
export class ConfigService {

    base_url: string;
    private configuration : any = {};

    constructor(private http: HttpClient) {
        this.base_url = environment.apiUrl;
    }

    getAPIBase() : string {
       return  this.base_url
    }
    
    loadAppConfig(): Observable<void>{
        return this.http.get(`${this.base_url}/api/v1/config`)
        .pipe(
          tap((configuration: any) => this.configuration = configuration),
          mapTo(undefined),
        );
    }

    getValue(key: string, defaultValue?: any): any {
        return this.configuration[key] || defaultValue;
    }

    getDoctorConfigValue(key: string, defaultValue?: any) {
        return this.configuration?.doctor[key] || defaultValue;
    }

    getDoctorConfig() {
        return this.configuration?.doctor;
    }

}

export function initApp(configurationService: ConfigService) {
    return () => configurationService.loadAppConfig().toPromise();
  }