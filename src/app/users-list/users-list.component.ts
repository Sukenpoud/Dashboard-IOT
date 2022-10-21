import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { User } from '@/_models';
import { UserService, AuthenticationService } from '@/_services';

declare var L: any;

@Component({ templateUrl: 'users-list.component.html' })
export class UsersListComponent implements OnInit {

    currentUser: User;

    constructor(
        private authenticationService: AuthenticationService
    ) {
        this.currentUser = this.authenticationService.currentUserValue;
    }

    ngOnInit() {

    }

}