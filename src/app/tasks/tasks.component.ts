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

  columns: Array<PoTableColumn>;
  items: Array<any>;

  ngOnInit() {
    this.columns = this.tasksService.getColumns();
    this.items = this.tasksService.getItems();
  }

}