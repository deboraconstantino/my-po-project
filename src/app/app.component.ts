import { Component, OnInit } from "@angular/core";

import { PoMenuItem } from "@portinari/portinari-ui";
import { TasksService } from "./tasks/tasks.service";
import { Observable } from "rxjs";
import { LoginService } from "./login/login.service";
import { CategoriesService } from "./categories/categories.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  authOk$: Observable<boolean>;

  constructor(
    private tasksService: TasksService,
    private loginService: LoginService,
    private categoriesService: CategoriesService
  ) {}

  ngOnInit(): void {
    this.authOk$ = this.loginService.isLoggedIn;
  }

  readonly menus: Array<PoMenuItem> = [
    {
      label: "Minhas Tarefas",
      subItems: [
        {
          label: "Tarefas Pendentes",
          action: () => this.tasksService.setStatus("false"),
          link: "tasks"
        },
        {
          label: "Tarefas Finalizadas",
          link: "end-tasks",
          action: () => this.tasksService.setStatus("true")
        }
      ]
    },
    {
      label: "Minhas Categorias",
      subItems: [
        { label: "Categorias",
          link: "categories",
          action: () => this.categoriesService.getCategories()
        },
        { label: "Incluir categoria",
          link: "form-categories"
        }
      ]
    },
    { label: "Logout", link: "/" }
  ];
}
