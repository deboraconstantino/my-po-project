import { Router } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable()
export class LoginService {

    constructor(private router: Router) {}

    doLogin(user) {
        if (user.login === "admin" && user.password === "admin") {
            this.router.navigate(['tasks']);
        }
    }

}