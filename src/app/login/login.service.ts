import { Router } from "@angular/router";
import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { PoNotificationService } from "@portinari/portinari-ui";

@Injectable()
export class LoginService {
  private loggedIn = new BehaviorSubject<boolean>(false);

  constructor(
    private router: Router,
    private poNotification: PoNotificationService
  ) {}

  doLogin(user) {
    if (user.login === "admin" && user.password === "admin") {
      this.loggedIn.next(true);
      this.router.navigate(["tasks"]);
    } else {
      this.poNotification.error("Login inválido! Tente novamente.");
      return false;
    }
  }

  isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  doLogout() {
    this.loggedIn.next(false);
    this.router.navigate(["/login"]);
  }
}
