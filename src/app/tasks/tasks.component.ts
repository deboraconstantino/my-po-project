import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import 'rxjs/add/operator/switchMap';

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

  searchForm: FormGroup
  searchControl: FormControl

  constructor(private tasksService: TasksService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private poNotification: PoNotificationService,
    private poAlert: PoDialogService,
    private datePipe: DatePipe,
    private formBuilder: FormBuilder) { }

  columns: Array<PoTableColumn>;
  items: any;
  detail: any;
  action: string;
  actionOptions: Array<string>;
  date = new Date();

  ngOnInit() {
    this.columns = this.tasksService.getColumns();
    this.tasksService.getTasks()
    .subscribe(dados => this.items = dados
      .map((dado) => ({... dado,
      status: this.tasksService.updStatus(dado.start, dado.end, dado.status)
    })))

    this.searchControl = this.formBuilder.control('')
    this.searchForm = this.formBuilder.group({
      searchControl: this.searchControl
    })

    this.searchControl.valueChanges.switchMap(searchTerm => 
      this.tasksService.getEndTasks(searchTerm))
      .subscribe(dados => this.items = dados)
  }

  actions: Array<PoTableAction> = [
    { action: this.viewTask.bind(this), icon: 'po-icon po-icon-eye', label: 'Detalhes' },
    { action: this.openDialogEnd.bind(this), icon: 'po-icon po-icon-ok', label: 'Finalizar' }
  ];

  @ViewChild(PoModalComponent, { static: true }) poModal: PoModalComponent;

  viewTask(task) {
    this.detail = task;
    this.poModal.open();
  }

  updateTask(task) {
    this.detail = task
    if (this.detail.done == true) {
      this.poNotification.error("Essa tarefa já foi finalizada.")
    } else {
      this.detail.end = this.datePipe.transform(this.date, 'yyyy-MM-dd')
      this.detail.done = true
      this.detail.status = "finished"
      this.tasksService.updateTask(this.detail)
      .subscribe(a => this.poNotification.success("Tarefa finalizada com sucesso!"));
      this.ngOnInit();
    }
  }

  openDialogEnd(id) {
    this.poAlert.confirm({
      title: "Finalizar tarefa",
      message: "Confirma a conclusão da tarefa? Esta ação não poderá ser desfeita.",
      confirm: () => this.updateTask(id),
      cancel: () => this.refresh()
    });
  }

  openDialog(id) {
    this.poAlert.confirm({
      title: "Excluir tarefa",
      message: "Confirma a exclusão da tarefa?",
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