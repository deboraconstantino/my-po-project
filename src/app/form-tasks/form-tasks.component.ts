import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Form, Validators } from "@angular/forms";

import { Task } from "../tasks/task.model";
import { TasksService } from "../tasks/tasks.service";
import { ActivatedRoute, Router } from "@angular/router";
import { PoNotification, PoNotificationService } from "@portinari/portinari-ui";
import { map, switchMap } from "rxjs/operators";

@Component({
  selector: "app-form-tasks",
  templateUrl: "./form-tasks.component.html",
  styleUrls: ["./form-tasks.component.css"]
})
export class FormTasksComponent implements OnInit {
  formTasks: FormGroup;
  submitted: boolean = false;

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
    private poNotification: PoNotificationService
  ) {}

  ngOnInit() {
    // this.activatedroute.params.subscribe(
    //   (params: any) => {
    //     const id = params['id']
    //     console.log(id);
    //     const task$ = this.tasksService.getById(id);
    //     task$.subscribe( task => {
    //       this.updateForm(task);
    //     })
    //   }
    // )

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
        this.tasksService.updateTask(this.formTasks.value)
        .subscribe(a => this.poNotification.success("Tarefa alterada com sucesso!"));
      } else {
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
