import { Component, OnInit, ViewChild } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { DatePipe } from "@angular/common";
import { FormBuilder, FormControl, FormGroup } from "@angular/forms";
import "rxjs/add/operator/switchMap";

import {
  PoTableColumn,
  PoTableAction,
  PoNotificationService,
  PoDialogService
} from "@portinari/portinari-ui";

import { TasksService } from "./tasks.service";
import { Task } from "./task.model";

@Component({
  selector: "sample-po-page-dynamic-table-users",
  styleUrls: ["./tasks.component.css"],
  templateUrl: "./tasks.component.html",
  preserveWhitespaces: true
})
export class TasksComponent implements OnInit {
  task: Task;
  disableShowMore: boolean = false;
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
  date = new Date();
  page = 1;
  limit = 10;

  ngOnInit() {
    this.columns = this.tasksService.getColumns();
    this.tasksService.getTasks(localStorage.getItem("id")).subscribe(
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
      action: this.openDialogEnd.bind(this),
      icon: "po-icon po-icon-ok",
      label: "Finalizar",
      visible: this.disableBtnFinalizar()
    }
  ];

  updateTask(task) {
    this.detail = task;
    if (this.detail.done == true) {
      this.poNotification.error("Essa tarefa já foi finalizada.");
    } else {
      this.detail.end = this.datePipe.transform(this.date, "yyyy-MM-dd");
      this.detail.done = true;
      this.detail.status = "finished";
      this.tasksService.updateTask(this.detail).subscribe(a => {
        this.poNotification.success("Tarefa finalizada com sucesso!"),
          this.refresh();
      });
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
      confirm: () => this.removeTask(id),
      cancel: () => this.refresh()
    });
  }

  edit(id) {
    this.router.navigate(["/edit", id], { relativeTo: this.activatedRoute });
  }

  include() {
    this.router.navigate(["/form-tasks"], { relativeTo: this.activatedRoute });
  }

  removeTask(id) {
    this.tasksService.removeTask(id).subscribe(a => {
      this.poNotification.success("Tarefa excluída com sucesso!"),
        this.refresh();
    });
  }

  refresh() {
    this.tasksService.getTasks(localStorage.getItem("id")).subscribe(
      dados =>
        (this.items = dados.map(dado => ({
          ...dado,
          status: this.tasksService.updStatus(dado.start, dado.end, dado.status)
        })))
    );
  }

  disableBtnFinalizar() {
    if (this.router.url === "/end-tasks") {
      return false;
    }
    return true;
  }

  showMore() {
    this.page++;

    this.tasksService
      .getTasks(localStorage.getItem("id"), this.page, this.limit)
      .subscribe(
        dados =>
          (this.items = [
            ...this.items,
            ...dados.map(dado => ({
              ...dado,
              status: this.tasksService.updStatus(
                dado.start,
                dado.end,
                dado.status
              )
            }))
          ])
      );
  }
}
