import { Component, OnInit, Inject, Injectable } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { map, switchMap } from "rxjs/operators";

import { PoNotificationService, PoComboOption } from "@portinari/portinari-ui";

import { Task } from "../tasks/task.model";
import { TasksService } from "../tasks/tasks.service";
import { CategoriesService } from '../categories/categories.service';

@Component({
  selector: "app-form-tasks",
  templateUrl: "./form-tasks.component.html",
  styleUrls: ["./form-tasks.component.css"]
})

@Injectable()
export class FormTasksComponent implements OnInit {
  formTasks: FormGroup;
  submitted: boolean = false;
  categories: Array<PoComboOption>
  data = new Date();
  newDate;
  atStart: string

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
    private categoriesService: CategoriesService) {}

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
      name: [this.tasks.name, [Validators.required]],
      description: [
        this.tasks.description,
        [Validators.required, Validators.minLength(15)]
      ],
      category: [this.tasks.category, [Validators.required]],
      start: [this.tasks.start, [Validators.required]]
    });
  }

  onSubmit() {
    this.submitted = true;
    if (this.formTasks.valid) {
      if (this.formTasks.value.id) {
        this.updateTask();
      } else {
        this.formTasks.value.done = this.tasks.done
        this.inputTask();
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
      this.tasksService.updateTask(this.formTasks.value)
      .subscribe(a => this.poNotification.success("Tarefa alterada com sucesso!"));
  }

  inputTask() {
    this.tasksService.postItems(this.formTasks.value)
    .subscribe(a => {
      this.poNotification.success("Tarefa incluída com sucesso!"),
      this.clear();
    }); 
  }

  clear() {
    this.formTasks.reset();
  }
}