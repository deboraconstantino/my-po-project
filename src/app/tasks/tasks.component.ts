import { Component, OnInit, Input } from '@angular/core';

import { PoTableColumn, PoTableAction } from '@portinari/portinari-ui';

import { TasksService } from './tasks.service';
import { Task } from './task.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'sample-po-page-dynamic-table-users',
  templateUrl: './tasks.component.html'
})

export class TasksComponent implements OnInit {

  constructor(private tasksService: TasksService) {

  }

  columns: Array<PoTableColumn>;
  items: Task[];

  //items$: Observable<Task>

  ngOnInit() {
    this.columns = this.tasksService.getColumns();
    this.tasksService.getTasks().subscribe(dados => this.items = dados)
  }

  actions: Array<PoTableAction> = [
    { icon: 'po-icon po-icon-eye', label: 'Visualizar' },
    { icon: 'po-icon po-icon-edit', label: 'Editar' },
    { icon: 'po-icon po-icon-close', label: 'Excluir' }
  ];
}