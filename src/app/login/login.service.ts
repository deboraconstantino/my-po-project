import { Router } from "@angular/router";
import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { PoNotificationService } from "@portinari/portinari-ui";
import { HttpClient } from "@angular/common/http";
import { ErrorHandler } from "../app.error-handler";
import { TASKS_API } from "../app.api";
import { User } from "./new-user/user.model";

@Injectable()
export class LoginService {
  private loggedIn = new BehaviorSubject<boolean>(false);
  users;

  constructor(
    private router: Router,
    private poNotification: PoNotificationService,
    private http: HttpClient
  ) {}

  doLogin(user) {
    this.users = this.getUser(user.login, user.password).subscribe(users => {
      this.users = users;
      if (users.length > 0) {
        this.loggedIn.next(true);
        this.router.navigate(["tasks"]);
        localStorage.setItem("id", users[0].id)
        localStorage.setItem("user", user.login);
        localStorage.setItem("pass", user.password);
      } else {
        this.poNotification.error("Login inválido! Tente Novamente.");
      }
    });
  }

  isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  doLogout() {
    this.loggedIn.next(false);
    localStorage.removeItem("id");
    localStorage.removeItem("user");
    localStorage.removeItem("pass")
    this.router.navigate(["/login"]);
  }

  postUser(user) {
    return this.http
      .post(`${TASKS_API}/users`, user)
      .catch(ErrorHandler.handleError);
  }

  getUser(user?, pass?) {
    return this.http
      .get<User[]>(`${TASKS_API}/users?user=${user}&pass=${pass}`)
      .catch(ErrorHandler.handleError);
  }
}
