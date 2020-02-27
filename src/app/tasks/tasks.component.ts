import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe } from '@angular/common';

import { PoTableColumn, PoTableAction, PoModalComponent, PoNotificationService, PoDialogService } from '@portinari/portinari-ui';

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
    private activatedRoute: ActivatedRoute,
    private poNotification: PoNotificationService,
    private poAlert: PoDialogService,
    private datePipe: DatePipe) { }

  columns: Array<PoTableColumn>;
  items: any;
  detail: any;
  action: string;
  actionOptions: Array<string>;
  date = new Date();
  newDate;

  ngOnInit() {
    this.columns = this.tasksService.getColumns();
    this.tasksService.getTasks()
    .subscribe(dados => this.items = dados
      .map((dado) => ({... dado, start: this.datePipe.transform(dado.start, 'dd/MM/yyyy'),
      status: this.tasksService.updStatus(dado.start, dado.end, dado.status)})))
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

  openDialog(id) {
    this.poAlert.confirm({
      title: "Excluir tarefa",
      message: "Tem certeza de que deseja excluir essa tarefa?",
      confirm: () => this.remove(id),
      cancel: () => this.refresh()
    });
  }

  edit(id){
    this.router.navigate(['edit', id], { relativeTo: this.activatedRoute });
  }

  remove(id) {
    this.tasksService.removeTask(id)
    .subscribe(a => {
      this.poNotification.success("Tarefa excluída com sucesso!"),
      this.refresh();
    });
  }

  refresh() {
    this.tasksService.getTasks().subscribe(dados => this.items = dados
     .map((dado) => ({... dado, status: this.tasksService.updStatus(dado.start, dado.end, dado.status)})))
  }
}