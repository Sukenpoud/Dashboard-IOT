import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { AuthenticationService } from '@/_services';
import { AlertService } from '@/_services';

@Injectable({ providedIn: 'root' })
export class AdminGuard implements CanActivate {
    constructor(
        private router: Router,
        private authenticationService: AuthenticationService,
        private alertService: AlertService
    ) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const currentUser = this.authenticationService.currentUserValue;
        if (currentUser && (currentUser.role == "admin" || currentUser.role == "superadmin")) {
            // authorised so return true
            return true;
        }

        // not admin in so redirect to dashboard page with the return url
        const error = "Seul un administrateur peut accéder à cette page.";
        this.alertService.error(error);

        return false;
    }
}