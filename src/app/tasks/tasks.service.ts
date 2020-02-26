import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { TASKS_API } from '../app.api';
import { ErrorHandler } from '../app.error-handler';
import { Task } from './task.model';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch'

import { PoTableColumn } from '@portinari/portinari-ui';

@Injectable()
export class TasksService {

  constructor(private http: HttpClient){}

  getColumns(): Array<PoTableColumn> {
    return [
      { property: 'name', label: 'Nome' },
      { property: 'category', label: 'Categoria' },
      { property: 'start', label: 'Início' },
      { property: 'end', label: 'Conclusão' },
      { property: 'status', type: 'label', width: '8%', labels: [
        { value: 'finished', color: 'color-11', label: 'Finalizada' },
        { value: 'late', color: 'color-07', label: 'Atrasada' }
      ]}
    ];
  }

  getTasks() {
    return this.http.get<Task[]>(`${TASKS_API}/tasks`)
    .catch(ErrorHandler.handleError)
  }

  postItems(tasks) {
    return this.http.post(`${TASKS_API}/tasks`, tasks)
    .catch(ErrorHandler.handleError)
  }

  getById(id: string) {
    return this.http.get<Task[]>(`${TASKS_API}/tasks/${id}`)
    .catch(ErrorHandler.handleError)
  }

  updateTask(task) {
    return this.http.put(`${TASKS_API}/tasks/${task.id}`, task)
    .catch(ErrorHandler.handleError)
  }
}