import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { CategoriesComponent } from './categories.component';
import { FormCategoriesComponent } from './form-categories/form-categories.component';
import { CategoriesService } from './categories.service';
import { AppComponent } from '../app.component';
import { AuthGuard } from './../auth/auth.guard';
import { Routes } from '@angular/router'
import { PoPageDynamicTableModule, PoPageDynamicSearchModule  } from '@portinari/portinari-templates';
import { PoPageModule, PoModule } from '@portinari/portinari-ui';
import { BrowserModule } from '@angular/platform-browser';

const ROUTES: Routes = [
    {path: 'categories', component: CategoriesComponent, canActivate: [AuthGuard]},
    {path: 'form-categories', component: FormCategoriesComponent, canActivate: [AuthGuard]},
    {path: 'edit-category/:id', component: FormCategoriesComponent, canActivate: [AuthGuard]}
]

@NgModule({
  declarations: [
    CategoriesComponent,
    FormCategoriesComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(ROUTES),
    ReactiveFormsModule,
    HttpClientModule,
    PoPageDynamicTableModule,
    PoPageModule,
    PoPageDynamicSearchModule,
    PoModule
  ],
  providers: [CategoriesService],
  bootstrap: [AppComponent]
})
export class CategoriesModule { }