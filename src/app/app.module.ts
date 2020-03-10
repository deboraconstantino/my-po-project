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
import { FormTasksComponent } from './tasks/form-tasks/form-tasks.component';

import { CategoriesService } from './categories/categories.service';
import { LoginComponent } from './login/login.component';
import { CategoriesModule } from './categories/categories.module';
import { LoginModule } from './login/login.module';

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
    PoModalModule,
    PoPageDynamicSearchModule,
    CategoriesModule,
    LoginModule
  ],
  providers: [TasksService,
    HttpClientModule,
    PoModalComponent,
    CategoriesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
