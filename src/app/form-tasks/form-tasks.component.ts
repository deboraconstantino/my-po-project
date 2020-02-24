import { Component, OnInit } from '@angular/core';
import  {  FormBuilder,  FormGroup, Form  }  from  '@angular/forms';

import { Task } from '../tasks/task.model';
import { Http } from '@angular/http';
import { TASKS_API } from '../app.api';
import { TasksService } from '../tasks/tasks.service';

@Component({
  selector: 'app-form-tasks',
  templateUrl: './form-tasks.component.html',
  styleUrls: ['./form-tasks.component.css']
})
export class FormTasksComponent implements OnInit {
  formTasks: FormGroup;

  tasks: Task = {
    id: "",
    name: "",
    description: "",
    category: "",
    start: "",
    end: "",
    status: ""
  }

  constructor(private formBuilder: FormBuilder,
    private tasksService: TasksService) { }

  ngOnInit() {
    this.formTasks = this.formBuilder.group({
      id: [this.tasks.id],
      name: [this.tasks.name],
      description: [this.tasks.description],
      category: [this.tasks.category],
      start: [this.tasks.start],
      end: [this.tasks.end],
      status: [this.tasks.status]
    })
  }

  onSubmit() {
    console.log(this.formTasks.value);
    this.tasksService.postItems(this.formTasks.value).subscribe(response => response)
    this.clear();
    }

  clear() {
    this.formTasks.reset();
  }
}