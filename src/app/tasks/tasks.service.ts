import { Injectable, OnInit } from '@angular/core';
import { Http } from '@angular/http';


import { ErrorHandler } from '../app.error-handler';
import { Task } from './task.model'

import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch'

@Injectable()
export class TasksService {

     constructor(private http: Http){}

// //   getStatus() {
// //     return [
// //       { value: 'hired', label: 'Finalizada' },
// //       { value: 'progress', label: 'Atrasada' },
// //       { value: 'canceled', label: 'Cancelada'},
// //       {value: 'late', label: 'Atrasada'}
// //     ];
// //   }

  getItems(): Observable<Task[]> {
    return this.http.get("http://localhost:3000/tasks").map(response => response.json().items)
    .catch(ErrorHandler.handleError)
  }

//   getJobs() {
//     return [
//       { value: 'Systems Analyst', label: 'Systems Analyst' },
//       { value: 'Trainee', label: 'Trainee' },
//       { value: 'Programmer', label: 'Programmer'},
//       { value: 'Web Developer', label: 'Web developer'},
//       { value: 'Recruiter', label: 'Recruiter'},
//       { value: 'Consultant', label: 'Consultant'},
//       { value: 'DBA', label: 'DBA'}
//     ];
//   }

}