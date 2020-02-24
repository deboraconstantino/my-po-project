import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { ROUTES } from './app.routes';

import { AppComponent } from './app.component';
import { PoModule } from '@portinari/portinari-ui';
import { PoPageDynamicTableModule } from '@portinari/portinari-templates';
import { PoPageModule } from '@portinari/portinari-ui';

import { TasksComponent } from './tasks/tasks.component';
import { TasksService } from './tasks/tasks.service';
import { FormTasksComponent } from './form-tasks/form-tasks.component';

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
    HttpClientModule
  ],
  providers: [TasksService, HttpClientModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
