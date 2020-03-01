import { Component } from '@angular/core';

import { PoMenuItem } from '@portinari/portinari-ui';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  readonly menus: Array<PoMenuItem> = [
    { label: 'Home', link: '/' },
    { label: 'Incluir Tarefas', link: 'form-tasks', action: this.teste },
    { label: 'Tarefas Finalizadas', link: 'end-tasks' }
  ];

  teste() {
    console.log("teste")
  }
}
