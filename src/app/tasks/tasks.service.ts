import { Injectable, OnInit } from '@angular/core';
import { Http } from '@angular/http';

import { TASKS_API } from '../app.api';

import { ErrorHandler } from '../app.error-handler';
import { Task } from './task.model';
import { FormTasksComponent } from '../form-tasks/form-tasks.component';

import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch'
import { PoTableColumn } from '@portinari/portinari-ui';

@Injectable()
export class TasksService {

     constructor(private http: Http){}

  getColumns(): Array<PoTableColumn> {
    return [
      { property: 'name', label: 'Nome' },
      { property: 'description', label: 'Descrição' },
      { property: 'category', label: 'Categoria' },
      { property: 'start', label: 'Início' },
      { property: 'end', label: 'Fim' },
      { property: 'status', type: 'label', width: '8%', labels: [
        { value: 'finished', color: 'color-11', label: 'Finalizada' },
        { value: 'late', color: 'color-07', label: 'Atrasada' }
      ]}
    ];
  }

  getItems(): Observable<Task[]> {
    return this.http.get(`${TASKS_API}/tasks`).map(response => response.json())
    .catch(ErrorHandler.handleError)
  }

  postItems(tasks) {
    return this.http.post(`${TASKS_API}/tasks`, tasks);
  }

}