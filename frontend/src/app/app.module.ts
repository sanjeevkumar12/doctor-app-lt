import { NgModule , APP_INITIALIZER} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutModule } from './layout/layout.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { CoreModule } from './core/core.module';
import { AuthService } from './core/services/auth.service';
import { AuthModule } from './auth/auth.module';
import { HttpErrorInterceptor } from './core/interceptors/error.interceptor';
import { authInterceptorProviders } from './core/interceptors/auth.interceptor';
import { NotfoundComponent } from './core/components/notfound/notfound.component';
import { DialogModule } from './dialog/dialog.module';
import { AdminModule } from './admin/admin.module';
import { ConfigService, initApp } from './core/services/config.service';



@NgModule({
  declarations: [
    AppComponent,
    NotfoundComponent
    
  ],
  exports: [],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    CoreModule,
    DialogModule,
    AuthModule,    
    LayoutModule,
    DashboardModule,
    AdminModule
  ],
  providers: [{
    provide: APP_INITIALIZER,
      useFactory: initApp,
      multi: true,
      deps: [ConfigService]
      
  },
    AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorInterceptor,
      multi: true
  
    },
    authInterceptorProviders
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
