import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { TASKS_API } from '../app.api';
import { ErrorHandler } from '../app.error-handler';
import { Task } from './task.model';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { PoTableColumn } from '@portinari/portinari-ui';
import { DatePipe } from '@angular/common';

@Injectable()
export class TasksService {
  date = new Date();
  newDate;
  status = "false"

  constructor(private http: HttpClient,
    private datePipe: DatePipe){}

  getColumns(): Array<PoTableColumn> {
    return [
      { property: 'name', label: 'Nome' },
      { property: 'category', label: 'Categoria' },
      { property: 'start', label: 'Data Limite', type: 'date' },
      { property: 'end', label: 'Conclusão', type: 'date' },
      { property: 'status', type: 'label', width: '8%', labels: [
        { value: 'finished', color: 'color-11', label: 'Finalizada' },
        { value: 'late', color: 'color-07', label: 'Atrasada' },
        { value: 'pending', color: 'color-01', label: 'Pendente' },
        { value: 'today', color: 'color-08', label: 'P/ Hoje' }
      ]}
    ];
  }

  getTasks(search: string = "") {
    return this.http.get<Task[]>(`${TASKS_API}/tasks?done=${this.status}`, {params: {q: search}})
    .catch(ErrorHandler.handleError)
  }

  getTasksByCategory(category?) {
    return this.http.get<Task[]>(`${TASKS_API}/tasks?done=${this.status}&category=${category}`)
    .catch(ErrorHandler.handleError)
  }

  getTasksByName(name?) {
    return this.http.get<Task[]>(`${TASKS_API}/tasks?done=${this.status}&name=${name}`)
    .catch(ErrorHandler.handleError)
  }

  setStatus(status: string) {
    this.status = status
  }

  getTasksByDate(date?) {
    return this.http.get<Task[]>(`${TASKS_API}/tasks?done=${this.status}&start=${date}`)
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
    start = this.datePipe.transform(start, 'dd/MM/yyyy')
    this.newDate = this.datePipe.transform(this.date, 'dd/MM/yyyy')
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