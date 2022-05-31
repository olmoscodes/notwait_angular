import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientGuard } from 'src/app/shared/guards/client/client.guard';
import { BusinessComponent } from './business/business.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [ClientGuard] 
  },
  {
    path: ':id',
    component: BusinessComponent,
    canActivate: [ClientGuard] 
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientsZoneRoutingModule { }
