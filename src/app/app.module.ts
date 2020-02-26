import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { ROUTES } from './app.routes';

import { AppComponent } from './app.component';
import { PoPageDynamicTableModule } from '@portinari/portinari-templates';
import { PoModalModule, PoModalComponent, PoPageModule, PoModule } from '@portinari/portinari-ui';

import { TasksComponent } from './tasks/tasks.component';
import { TasksService } from './tasks/tasks.service';
import { FormTasksComponent } from './form-tasks/form-tasks.component';
import { Task } from './tasks/task.model';

@NgModule({
  declarations: [
    AppComponent,
    TasksComponent,
    FormTasksComponent
  ],
  imports: [
    BrowserModule,
    PoModule,
    RouterModule.forRoot(ROUTES),
    FormsModule,
    ReactiveFormsModule,
    PoPageDynamicTableModule,
    PoPageModule,
    HttpClientModule,
    PoModalModule
  ],
  providers: [TasksService, HttpClientModule, PoModalComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
