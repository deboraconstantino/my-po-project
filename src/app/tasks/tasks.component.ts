import { Component, OnInit, Input } from '@angular/core';

import { PoPageDynamicTableActions } from '@portinari/portinari-templates';
import { PoTableColumn } from '@portinari/portinari-ui';

import { TasksService } from './tasks.service';
import { Task } from './task.model';

@Component({
  selector: 'sample-po-page-dynamic-table-users',
  templateUrl: './tasks.component.html'
})

export class TasksComponent implements OnInit {

  constructor(private tasksService: TasksService) {

  }

  @Input() tasks: Task[]

  ngOnInit() {
    this.tasksService.getItems().subscribe(task => this.tasks = task)
  }

  public readonly serviceApi = 'http://localhost:3000/tasks';

  public readonly actions: PoPageDynamicTableActions = {
    detail: 'dynamic-detail/:id',
    duplicate: 'dynamic-new',
    edit: 'dynamic-edit/:id',
    new: 'dynamic-new',
    remove: true,
    removeAll: true
  };

  public readonly fields: Array<any> = [
    { property: 'id', label: 'Id', key: true },
    { property: 'name', label: 'Nome', filter: true, gridColumns: 6 },
    { property: 'description', label: 'Descrição', filter: true, gridColumns: 6, duplicate: true },
    { property: 'category', label: 'Categoria', type: 'string', gridColumns: 6 },
    { property: 'start', label: 'Início', filter: true, duplicate: true, gridColumns: 12 },
    { property: 'end', label: 'Fim', filter: true, duplicate: true, gridColumns: 12 }
  ];

}