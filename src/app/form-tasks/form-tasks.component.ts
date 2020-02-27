import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { map, switchMap } from "rxjs/operators";

import { PoNotificationService, PoComboOption } from "@portinari/portinari-ui";

import { Task } from "../tasks/task.model";
import { TasksService } from "../tasks/tasks.service";
import { CategoriesService } from '../categories/categories.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: "app-form-tasks",
  templateUrl: "./form-tasks.component.html",
  styleUrls: ["./form-tasks.component.css"]
})
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
    status: ""
  };

  constructor(
    private formBuilder: FormBuilder,
    private tasksService: TasksService,
    private activatedroute: ActivatedRoute,
    private poNotification: PoNotificationService,
    private categoriesService: CategoriesService,
    private datePipe: DatePipe) {}

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

  getStatus(){
    this.atStart = this.formTasks.value.start
    this.newDate = this.datePipe.transform(this.data, 'yyyy-MM-dd')

    if (this.atStart == this.newDate) {
      return this.formTasks.value.status = "today"
    } else if (this.atStart > this.newDate && !this.formTasks.value.end) {
      return this.formTasks.value.status = "pending"
    } else if (this.atStart < this.newDate && !this.formTasks.value.end) {
      return this.formTasks.value.status = "late"
    }
  }

  onSubmit() {
    this.submitted = true;
    if (this.formTasks.valid) {
      if (this.formTasks.value.id) {
        this.tasksService.updateTask(this.formTasks.value)
        .subscribe(a => this.poNotification.success("Tarefa alterada com sucesso!"));
      } else {
        this.getStatus()
        this.tasksService.postItems(this.formTasks.value)
        .subscribe(a => {
          this.poNotification.success("Tarefa incluída com sucesso!"),
          this.clear();
        }); 
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

  clear() {
    this.formTasks.reset();
  }
}