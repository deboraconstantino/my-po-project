import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { PoTableColumn, PoTableAction, PoModalComponent, PoModalAction, PoNotificationService } from '@portinari/portinari-ui';

import { TasksService } from './tasks.service';
import { Task } from './task.model';
import { PoModalService } from '@portinari/portinari-ui/lib/components/po-modal/po-modal-service';

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
    private poNotification: PoNotificationService) { }

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
    this.tasksService.getTasks().subscribe(dados => this.items = dados)
  }
}