import { Component, OnInit, ViewChild } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { DatePipe } from "@angular/common";
import { FormBuilder, FormControl, FormGroup } from "@angular/forms";
import "rxjs/add/operator/switchMap";

import {
  PoTableColumn,
  PoTableAction,
  PoModalComponent,
  PoNotificationService,
  PoDialogService
} from "@portinari/portinari-ui";

import { TasksService } from "./tasks.service";
import { Task } from "./task.model";

@Component({
  selector: "sample-po-page-dynamic-table-users",
  templateUrl: "./tasks.component.html",
  preserveWhitespaces: true
})
export class TasksComponent implements OnInit {
  task: Task;

  searchForm: FormGroup;
  searchControl: FormControl;

  constructor(
    private tasksService: TasksService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private poNotification: PoNotificationService,
    private poAlert: PoDialogService,
    private datePipe: DatePipe,
    private formBuilder: FormBuilder
  ) {}

  columns: Array<PoTableColumn>;
  items: any;
  detail: any;
  action: string;
  actionOptions: Array<string>;
  date = new Date();
  option;

  readonly options: Array<any> = [
    { label: "Todas", value: "all" },
    { label: "Tarefa", value: "task" },
    { label: "Categoria", value: "category" },
    { label: "Data Limite", value: "date" }
  ];

  ngOnInit() {
    this.columns = this.tasksService.getColumns();
    this.tasksService.getTasks().subscribe(
      dados =>
        (this.items = dados.map(dado => ({
          ...dado,
          status: this.tasksService.updStatus(dado.start, dado.end, dado.status)
        })))
    );

    this.searchControl = this.formBuilder.control("");
    this.searchForm = this.formBuilder.group({
      searchControl: this.searchControl.value
    });
  }

  actions: Array<PoTableAction> = [
    {
      action: this.viewTask.bind(this),
      icon: "po-icon po-icon-eye",
      label: "Detalhes"
    },
    {
      action: this.openDialogEnd.bind(this),
      icon: "po-icon po-icon-ok",
      label: "Finalizar"
    }
  ];

  @ViewChild(PoModalComponent, { static: true }) poModal: PoModalComponent;

  viewTask(task) {
    this.detail = task;
    this.poModal.open();
  }

  updateTask(task) {
    this.detail = task;
    if (this.detail.done == true) {
      this.poNotification.error("Essa tarefa já foi finalizada.");
    } else {
      this.detail.end = this.datePipe.transform(this.date, "yyyy-MM-dd");
      this.detail.done = true;
      this.detail.status = "finished";
      this.tasksService
        .updateTask(this.detail)
        .subscribe(a =>
          this.poNotification.success("Tarefa finalizada com sucesso!")
        );
      this.refresh();
    }
  }

  openDialogEnd(id) {
    this.poAlert.confirm({
      title: "Finalizar tarefa",
      message:
        "Confirma a conclusão da tarefa? Esta ação não poderá ser desfeita.",
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

  edit(id) {
    this.router.navigate(["/edit", id], { relativeTo: this.activatedRoute });
  }

  remove(id) {
    this.tasksService.removeTask(id).subscribe(a => {
      this.poNotification.success("Tarefa excluída com sucesso!"),
        this.poModal.close();
      this.refresh();
    });
  }

  refresh() {
    this.tasksService.getTasks().subscribe(
      dados =>
        (this.items = dados.map(dado => ({
          ...dado,
          status: this.tasksService.updStatus(dado.start, dado.end, dado.status)
        })))
    );
  }

  alter(value) {
    if (value == "category") {
      this.option = "category";
    } else if (value == "task") {
      this.option = "task";
    } else if (value == "date") {
      this.option = "date";
    } else if (value == "all") {
      this.searchForm.reset();
      this.searchForm.disable();
      this.refresh();
    }
  }

  change() {
    if (this.option == "category") {
      this.tasksService
        .getTasksByCategory(this.searchForm.value.searchControl)
        .subscribe(
          dados =>
            (this.items = dados.map(dado => ({
              ...dado,
              status: this.tasksService.updStatus(
                dado.start,
                dado.end,
                dado.status
              )
            })))
        );
    } else if (this.option == "task") {
      this.tasksService
        .getTasksByName(this.searchForm.value.searchControl)
        .subscribe(
          dados =>
            (this.items = dados.map(dado => ({
              ...dado,
              status: this.tasksService.updStatus(
                dado.start,
                dado.end,
                dado.status
              )
            })))
        );
    } else if (this.option == "date") {
      this.datePipe.transform(this.searchForm.value.searchControl, 'yyyy-MM-dd')
      this.tasksService
        .getTasksByDate(this.searchForm.value.searchControl)
        .subscribe(
          dados =>
            (this.items = dados.map(dado => ({
              ...dado,
              status: this.tasksService.updStatus(
                dado.start,
                dado.end,
                dado.status
              )
            })))
        );
    }
  }
}