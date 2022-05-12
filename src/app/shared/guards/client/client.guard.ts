import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { getAuth, onAuthStateChanged, User } from 'firebase/auth';
import { Observable } from 'rxjs';
import { DatabaseService } from '../../services/database.service';

const auth = getAuth();

@Injectable({
  providedIn: 'root'
})
export class ClientGuard implements CanActivate {
  constructor(private router: Router, private dbService: DatabaseService) {}

  actualUser: any = null;

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | Observable<boolean> | Promise<boolean> {
    return new Promise((resolve, reject) => {
      onAuthStateChanged(auth, async (user) => {
        if (!user) {
          this.router.navigate(['']);
          resolve(false);
        } else if (user && await this.dbService.isUserClient(user.uid) === false){
          this.router.navigate(['']);
          resolve(false);
        } else {
          resolve(true);
        }
      });
    });
  }  
}
