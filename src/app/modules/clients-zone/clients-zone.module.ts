import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientsZoneRoutingModule } from './clients-zone-routing.module';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { sqrt } from 'mathjs';
import { BusinessComponent } from './business/business.component'


@NgModule({
  declarations: [
    HomeComponent,
    BusinessComponent
  ],
  imports: [
    CommonModule,
    ClientsZoneRoutingModule,
    RouterModule.forChild([
      { path: '', component: HomeComponent},
      { path: ':id', component: BusinessComponent}
    ])
  ]
})
export class ClientsZoneModule { }
