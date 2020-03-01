import { Component, OnInit, Injectable } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { map, switchMap } from "rxjs/operators";

import { PoNotificationService, PoComboOption } from "@portinari/portinari-ui";

import { Task } from "../tasks/task.model";
import { TasksService } from "../tasks/tasks.service";
import { CategoriesService } from "../categories/categories.service";
import { DatePipe } from "@angular/common";

@Component({
  selector: "app-form-tasks",
  templateUrl: "./form-tasks.component.html",
  styleUrls: ["./form-tasks.component.css"]
})
@Injectable()
export class FormTasksComponent implements OnInit {
  formTasks: FormGroup;
  submitted: boolean = false;
  categories: Array<PoComboOption>;
  date = new Date();
  newDate;
  atStart: string;

  tasks: Task = {
    id: "",
    name: "",
    description: "",
    category: "",
    start: "",
    end: "",
    status: "",
    done: false
  };

  constructor(
    private formBuilder: FormBuilder,
    private tasksService: TasksService,
    private activatedroute: ActivatedRoute,
    private poNotification: PoNotificationService,
    private categoriesService: CategoriesService,
    private datePipe: DatePipe,
    private router: Router
  ) {}

  ngOnInit() {
    this.categories = this.categoriesService.getCategories();

    this.activatedroute.params
      .pipe(
        map((params: any) => params["id"]),
        switchMap(id => this.tasksService.getById(id))
      )
      .subscribe(task => {
        this.updateForm(task);
      });

    this.formTasks = this.formBuilder.group({
      id: [this.tasks.id],
      name: [
        this.tasks.name,
        [Validators.required, Validators.minLength(5), Validators.maxLength(15)]
      ],
      description: [
        this.tasks.description,
        [
          Validators.required,
          Validators.minLength(15),
          Validators.maxLength(80)
        ]
      ],
      category: [this.tasks.category, [Validators.required]],
      start: [this.tasks.start, [Validators.required]]
    });
  }

  onSubmit() {
    this.newDate = this.datePipe.transform(this.date, "yyyy-MM-dd");
    this.submitted = true;

    if (this.formTasks.valid) {
      if (this.formTasks.value.id) {
        if (this.validDate(this.formTasks.value.start)) {
          this.updateTask();
        } else {
          this.poNotification.error("Data inválida, tente novamente.");
        }
      } else if (!this.formTasks.value.id) {
        if (this.validDate(this.formTasks.value.start)) {
          this.formTasks.value.done = this.tasks.done;
          this.inputTask();
        } else {
          this.poNotification.error("Data inválida, tente novamente.");
        }
      }
    } else {
      this.poNotification.error(
        "Por favor, preencher nome, data, descrição e categoria da tarefa!"
      );
    }
  }

  updateForm(task) {
    this.formTasks.patchValue({
      id: task.id,
      name: task.name,
      description: task.description,
      start: task.start,
      category: task.category
    });
  }

  updateTask() {
    this.tasksService
      .updateTask(this.formTasks.value)
      .subscribe(a =>
        this.poNotification.success("Tarefa alterada com sucesso!")
      );
  }

  inputTask() {
    this.tasksService.postItems(this.formTasks.value).subscribe(a => {
      this.poNotification.success("Tarefa incluída com sucesso!"), this.clear();
    });
  }

  validDate(date) {
    if (date >= this.newDate) {
      return true;
    }
  }

  clear() {
    this.formTasks.reset();
  }

  close() {
    this.router.navigate(["/"]);
  }
}
