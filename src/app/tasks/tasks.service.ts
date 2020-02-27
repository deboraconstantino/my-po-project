import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { TASKS_API } from '../app.api';
import { ErrorHandler } from '../app.error-handler';
import { Task } from './task.model';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch'

import { PoTableColumn } from '@portinari/portinari-ui';
import { DatePipe } from '@angular/common';

@Injectable()
export class TasksService {
  date = new Date();
  newDate;

  constructor(private http: HttpClient,
    private datePipe: DatePipe){}

  getColumns(): Array<PoTableColumn> {
    return [
      { property: 'name', label: 'Nome' },
      { property: 'category', label: 'Categoria' },
      { property: 'start', label: 'Início' },
      { property: 'end', label: 'Conclusão' },
      { property: 'status', type: 'label', width: '8%', labels: [
        { value: 'finished', color: 'color-11', label: 'Finalizada' },
        { value: 'late', color: 'color-07', label: 'Atrasada' },
        { value: 'pending', color: 'color-01', label: 'Pendente' },
        { value: 'today', color: 'color-08', label: 'Para Hoje' }
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

  removeTask(id) {
    return this.http.delete(`${TASKS_API}/tasks/${id}`)
    .catch(ErrorHandler.handleError)
  }

  updStatus(start, end, status) {
    this.newDate = this.datePipe.transform(this.date, 'yyyy-MM-dd')
    if (start < this.newDate && !end) {
      return status = "late"
    } else if (start == this.newDate && !end) {
      return status = "today"
    } else if (start > this.newDate && !end) {
      return status = "pending"
    } else if (end) {
      return status = "finished"
    }
  }
}