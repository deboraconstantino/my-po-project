import { Injectable, OnInit } from '@angular/core';
import { Http } from '@angular/http';


import { ErrorHandler } from '../app.error-handler';
import { Task } from './task.model'

import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch'
import { PoTableColumn } from '@portinari/portinari-ui';

@Injectable()
export class TasksService {

     constructor(private http: Http){}

  getColumns(): Array<PoTableColumn> {
    return [
      { property: 'id', type: 'string', width: '8%', label: 'Código'},
      { property: 'name', label: 'Nome' },
      { property: 'description', label: 'Descrição' },
      { property: 'category', label: 'Categoria' },
      { property: 'start', label: 'Início' },
      { property: 'end', label: 'Fim' },
      { property: 'status', type: 'label', width: '8%', labels: [
        { value: 'finished', color: 'color-11', label: 'Finalizada' },
        { value: 'progress', color: 'color-08', label: 'Andamento' },
        { value: 'pending', color: 'color-01', label: 'Pendente' },
        { value: 'late', color: 'color-07', label: 'Atrasada' }
      ]}
    ];
  }

  getItems(): Array<any> {
    return [
      {
        id: 1200,
        name: 'Rice',
        description: 'Angeloni',
        category: 3,
        start: 1500,
        end: "",
        status: 'finished',
      },
      {
        id: 1200,
        name: 'Rice',
        description: 'Angeloni',
        category: 3,
        start: 1500,
        end: "",
        status: 'progress',
      },
      {
        id: 1200,
        name: 'Rice',
        description: 'Angeloni',
        category: 3,
        start: 1500,
        end: "",
        status: 'pending',
      },
      {
        id: 1200,
        name: 'Rice',
        description: 'Angeloni',
        category: 3,
        start: 1500,
        end: "",
        status: 'late',
      }
    ];
  }

}