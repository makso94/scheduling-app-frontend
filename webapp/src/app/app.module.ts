import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { MinutesToHoursPipe } from './pipes/minutes-to-hours.pipe';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { ToastrModule } from 'ngx-toastr';
import { ToastrInterceptorService } from './interceptors/toastr/toastr-interceptor.service';

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    MaterialModule,
    ToastrModule.forRoot(),
  ],
  exports: [],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ToastrInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
