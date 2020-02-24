import { Component, OnInit } from '@angular/core';
import  {  FormBuilder,  FormGroup, Form  }  from  '@angular/forms';
import { Task } from '../tasks/task.model';

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

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.formTasks = this.formBuilder.group({
      id: [this.tasks.id],
      name: [this.tasks.name],
      description: [this.tasks.description],
      category: [this.tasks.category],
      start: [this.tasks.start],
    })
  }

  onSubmit() {
    console.log(this.formTasks.value);
  }
}
