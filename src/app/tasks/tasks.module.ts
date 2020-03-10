import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './../app.component';
import { PoPageDynamicTableModule, PoPageDynamicSearchModule } from '@portinari/portinari-templates';
import { PoModalModule, PoModalComponent, PoPageModule, PoModule } from '@portinari/portinari-ui';

import { AuthGuard } from './../auth/auth.guard';

import { TasksComponent } from './tasks.component';
import { TasksService } from './tasks.service';
import { FormTasksComponent } from './form-tasks/form-tasks.component';

import { CategoriesService } from './../categories/categories.service';
import { CategoriesModule } from './../categories/categories.module';

const ROUTES: Routes = [
    {path: 'tasks', component: TasksComponent, canActivate: [AuthGuard]},
    {path: 'form-tasks', component: FormTasksComponent, canActivate: [AuthGuard]},
    {path: 'edit/:id', component: FormTasksComponent, canActivate: [AuthGuard]},
    {path: 'end-tasks', component: TasksComponent, canActivate: [AuthGuard]},
]

@NgModule({
  declarations: [
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
    PoModalModule,
    PoPageDynamicSearchModule,
    CategoriesModule
  ],
  providers: [TasksService,
    HttpClientModule,
    PoModalComponent,
    CategoriesService],
  bootstrap: []
})
export class TasksModule { }