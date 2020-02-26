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
  task: Task;

  constructor(private tasksService: TasksService,
    private router: Router,
    private activatedRoute: ActivatedRoute) { }

  columns: Array<PoTableColumn>;
  items: Task[];
  detail: any;
  idTask: string 
  //= this.activatedRoute.snapshot.params.id;

  ngOnInit() {
    this.columns = this.tasksService.getColumns();
    this.tasksService.getTasks().subscribe(dados => this.items = dados)
  }

  actions: Array<PoTableAction> = [
    { action: this.viewTask.bind(this), icon: 'po-icon po-icon-eye', label: 'Detalhes' },
    { icon: 'po-icon po-icon-ok', label: 'Finalizar' }
  ];

  @ViewChild(PoModalComponent, { static: true }) poModal: PoModalComponent;

  viewTask(task) {
    this.detail = task;
    this.poModal.open();
  }

  edit(id){
    console.log(id);
    this.router.navigate(['edit', id], { relativeTo: this.activatedRoute });
  }

  delet() {
    alert('excluir')
  }
}