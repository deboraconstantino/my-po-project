import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { PoTableColumn, PoTableAction, PoModalComponent, PoModalAction } from '@portinari/portinari-ui';

import { TasksService } from './tasks.service';
import { Task } from './task.model';

@Component({
  selector: 'sample-po-page-dynamic-table-users',
  templateUrl: './tasks.component.html',
  preserveWhitespaces: true
})

export class TasksComponent implements OnInit {

  constructor(private tasksService: TasksService,
    private route: Router,
    private activatedRoute: ActivatedRoute) { }

  task: Task;

  columns: Array<PoTableColumn>;
  items: Task[];
  detail: any;

  ngOnInit() {
    this.columns = this.tasksService.getColumns();
    this.tasksService.getTasks().subscribe(dados => this.items = dados)
  }

  actions: Array<PoTableAction> = [
    { action: this.viewTask.bind(this), icon: 'po-icon po-icon-eye', label: 'Detalhes' },
    { label: '' }
  ];

  @ViewChild(PoModalComponent, { static: true }) poModal: PoModalComponent;

  viewTask(task) {
    this.detail = task;
    this.poModal.open();
  }

  // edit: PoModalAction = {
  //   action: () => {
  //     this.route.navigate(['edit', this.task.id])
  //   },
  //   label: 'Alterar'
  // };

  // remove: PoModalAction = {
  //   action: () => {
  //     this.delet();
  //   },
  //   label: 'Excluir'
  // };

  delet() {
    alert('excluir')
  }
}