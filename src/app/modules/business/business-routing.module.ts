import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BusinessGuard } from 'src/app/shared/guards/business/business.guard';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [BusinessGuard] 
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BusinessRoutingModule { }
