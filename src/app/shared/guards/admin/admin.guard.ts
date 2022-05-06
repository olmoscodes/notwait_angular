import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { Observable } from 'rxjs';
import { DatabaseService } from '../../services/database.service';

const auth = getAuth();

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(private router: Router, private dbService: DatabaseService) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | Observable<boolean> | Promise<boolean> {
    return new Promise((resolve, reject) => {
      onAuthStateChanged(auth, async (user) => {
        if (!user) {
          this.router.navigate(['/auth/login']);
          resolve(false);
        } else if (user && await this.dbService.isUserAdmin(user.uid) === false){
          this.router.navigate(['/auth/login']);
          resolve(false);
        } else {
          resolve(true);
        }
      });
    });
  }
  
}
