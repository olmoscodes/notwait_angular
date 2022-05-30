import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientsRoutingModule } from './clients-routing.module';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { sqrt } from 'mathjs'


@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    ClientsRoutingModule,
    RouterModule.forChild([
      { path: '', component: HomeComponent}
    ])
  ]
})
export class ClientsModule { }
