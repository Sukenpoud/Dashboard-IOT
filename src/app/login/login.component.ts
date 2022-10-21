import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AlertService, AuthenticationService, UserService } from '@/_services';

// array in local storage for registered users
let users = JSON.parse(localStorage.getItem('users')) || [];

@Component({ templateUrl: 'login.component.html' })
export class LoginComponent implements OnInit {
    loginForm: FormGroup;
    loading = false;
    submitted = false;
    returnUrl: string;
    

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService,
        private alertService: AlertService,
        private userService: UserService
    ) {
        // redirect to home if already logged in
        if (this.authenticationService.currentUserValue) {
            this.router.navigate(['/']);
        }
    }

    ngOnInit() {
        this.loginForm = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });

        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';


        if (!users.find(x => x.username === "admin")){
            this.userService.register(
                {
                    firstName: 'John',
                    lastName: 'Doe',
                    username: 'admin',
                    password: 'adminpass',
                    role: 'admin',
                    id: 0,
                    token: ''
                })
                .pipe(first())
                .subscribe();
        }
        if (!users.find(x => x.username === "superadmin")){
            this.userService.register(
                {
                    firstName: 'John',
                    lastName: 'Doe',
                    username: 'superadmin',
                    password: 'superadminpass',
                    role: 'superadmin',
                    id: 1,
                    token: ''
                })
                .pipe(first())
                .subscribe();
        }
     
        
    }

    // convenience getter for easy access to form fields
    get f() { return this.loginForm.controls; }

    onSubmit() {
        this.submitted = true;

        // reset alerts on submit
        this.alertService.clear();

        // stop here if form is invalid
        if (this.loginForm.invalid) {
            return;
        }

        this.loading = true;
        this.authenticationService.login(this.f.username.value, this.f.password.value)
            .pipe(first())
            .subscribe(
                data => {
                    this.router.navigate([this.returnUrl]);
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });
    }
}
