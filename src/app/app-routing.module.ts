import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { 
    path: '', 
    loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule)
  },
  { 
    path: 'auth', 
    loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule),
  },
  { 
    path: 'clients',
    loadChildren: () => import('./modules/clients/clients.module').then(m => m.ClientsModule)
  },
  { 
    path: 'business', 
    loadChildren: () => import('./modules/business/business.module').then(m => m.BusinessModule)
  },
  { 
    path: 'admin', 
    loadChildren: () => import('./modules/admin/admin.module').then(m => m.AdminModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
