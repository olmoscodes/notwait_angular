import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { HttpClientModule } from '@angular/common/http';

import { CommonModule } from '@angular/common';
import { LocationInfoComponent } from './modules/location-info/location-info.component';

import { initializeApp } from "firebase/app";
import { firebaseConfig } from 'src/environments/environment';
initializeApp(firebaseConfig);

@NgModule({
  declarations: [
    AppComponent,
    LocationInfoComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    FontAwesomeModule,
    HttpClientModule,
    CommonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
