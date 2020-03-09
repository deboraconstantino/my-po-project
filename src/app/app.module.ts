import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { ROUTES } from './app.routes';

import { AppComponent } from './app.component';
import { PoPageDynamicTableModule, PoPageDynamicSearchModule, PoPageLoginModule, PoModalPasswordRecoveryModule  } from '@portinari/portinari-templates';
import { PoModalModule, PoModalComponent, PoPageModule, PoModule } from '@portinari/portinari-ui';

import { TasksComponent } from './tasks/tasks.component';
import { TasksService } from './tasks/tasks.service';
import { FormTasksComponent } from './form-tasks/form-tasks.component';

import { CategoriesComponent } from './categories/categories.component';
import { CategoriesService } from './categories/categories.service';
import { LoginComponent } from './login/login.component';
import { LoginService } from './login/login.service';

@NgModule({
  declarations: [
    AppComponent,
    TasksComponent,
    FormTasksComponent,
    CategoriesComponent,
    LoginComponent
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
    PoPageLoginModule,
    PoModalPasswordRecoveryModule
  ],
  providers: [TasksService,
    HttpClientModule,
    PoModalComponent,
    CategoriesService,
    LoginService,
    CategoriesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
