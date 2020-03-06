import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class LoginService {
    private loggedIn = new BehaviorSubject<boolean>(false);

    constructor(private router: Router) {}

    doLogin(user) {
        if (user.login === "admin" && user.password === "admin") {
            this.loggedIn.next(true);
            this.router.navigate(['tasks']);
        }
        return false;
    }

    get isLoggedIn() {
        return this.loggedIn.asObservable();
    }

    doLogout() {
        this.router.navigate(['/login']);
        return false;
    }
}