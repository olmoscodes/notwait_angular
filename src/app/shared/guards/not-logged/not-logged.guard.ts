import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { Observable } from 'rxjs';
import { DatabaseService } from '../../services/database.service';

const auth = getAuth();

@Injectable({
  providedIn: 'root'
})
export class NotLoggedGuard implements CanActivate {
  constructor(private router: Router, private dbService: DatabaseService) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | Observable<boolean> | Promise<boolean> {
    return new Promise((resolve, reject) => {
      onAuthStateChanged(auth, async (user) => {
        if (user) {
          if (await this.dbService.isUserClient(user.uid) === true) {
            this.router.navigate(['/clients']);
          } else if (await this.dbService.isUserBusiness(user.uid) === true) {
            this.router.navigate(['/business']);
          } else if (await this.dbService.isUserAdmin(user.uid) === true) {
            this.router.navigate(['/admin']);
          }
          resolve(false);
        } else {
          resolve(true);
        }
      });
    });
  }  
}
