import { Component } from '@angular/core';

import { PoMenuItem } from '@portinari/portinari-ui';
import { TasksService } from './tasks/tasks.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private tasksService: TasksService) {}

  readonly menus: Array<PoMenuItem> = [
    { label: 'Minhas Tarefas', link: '/', action: () => this.tasksService.setStatus("false") },
    { label: 'Tarefas Finalizadas', link: 'end-tasks', action: () => this.tasksService.setStatus("true") },
    { label: 'Incluir Tarefas', link: 'form-tasks' }
  ];
}
