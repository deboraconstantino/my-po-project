import { LoginService } from "../login/login.service";
import { Injectable } from "@angular/core";
import {
  CanActivate,
  Router
} from "@angular/router";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class AuthGuard implements CanActivate {
  constructor(
    private loginService: LoginService,
    private router: Router
  ) {}

  canActivate(): Observable<boolean> | boolean {
    return this.loginService.isLoggedIn
      .map((isLoggedIn: boolean) => {
        if (!isLoggedIn){
          this.router.navigate(['/login']);
          return false;
        }
        return true;
      })
  }
}