import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientsZoneRoutingModule } from './clients-zone-routing.module';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { sqrt } from 'mathjs';
import { BusinessComponent } from './business/business.component'
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ClientsSettingsComponent } from './clients-settings/clients-settings.component';
import { ProximityInfoComponent } from './proximity-info/proximity-info.component';


@NgModule({
  declarations: [
    HomeComponent,
    BusinessComponent,
    ClientsSettingsComponent,
    ProximityInfoComponent
  ],
  imports: [
    CommonModule,
    ClientsZoneRoutingModule,
    FontAwesomeModule,
    RouterModule.forChild([
      { path: '', component: HomeComponent},
      { path: ':id', component: BusinessComponent},
      { path: 'settings', component: ClientsSettingsComponent},
      { path: 'proximity-info', component: ProximityInfoComponent}
    ])
  ]
})
export class ClientsZoneModule { }
