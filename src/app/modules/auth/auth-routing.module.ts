import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotLoggedGuard } from 'src/app/shared/guards/not-logged/not-logged.guard';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  {
    path: '', 
    component: LoginComponent,
    canActivate: [NotLoggedGuard]   
    },
  {
    path: 'auth/login', 
    component: LoginComponent,
    canActivate: [NotLoggedGuard]
  },
  {
    path: 'auth/register', 
    component: RegisterComponent,
    canActivate: [NotLoggedGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
