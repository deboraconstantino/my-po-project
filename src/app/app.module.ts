import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ROUTES } from './app.routes';

import { AppComponent } from './app.component';
import { PoModule, PoPageModule, PoModalModule, PoModalComponent } from '@portinari/portinari-ui';

import { CategoriesModule } from './categories/categories.module';
import { LoginModule } from './login/login.module';
import { TasksService } from './tasks/tasks.service';
import { TasksComponent } from './tasks/tasks.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PoPageDynamicTableModule, PoPageDynamicSearchModule } from '@portinari/portinari-templates';
import { HttpClientModule } from '@angular/common/http';
import { FormTasksComponent } from './tasks/form-tasks/form-tasks.component';
import { CategoriesService } from './categories/categories.service';
import { SearchPipe } from './pipes/search.pipe';

@NgModule({
  declarations: [
    AppComponent,
    TasksComponent,
    FormTasksComponent,
    SearchPipe
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
