import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { UserService } from '../services/user.service';

@Injectable({ providedIn: 'root' })
export class LoggedOutGuard implements CanActivate {
    constructor(
        private router: Router,
        private userService: UserService
    ) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const userActive = this.userService.isLoggedIn();
        if (userActive) {
            this.router.navigate(['/home']);
        }
        return !userActive;
    }
}