import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { CategoriesComponent } from './categories.component';
import { FormCategoriesComponent } from './form-categories/form-categories.component';
import { ROUTES } from '../app.routes';
import { CategoriesService } from './categories.service';
import { AppComponent } from '../app.component';

@NgModule({
  declarations: [
    CategoriesComponent,
    FormCategoriesComponent
  ],
  imports: [
    RouterModule.forRoot(ROUTES),
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [CategoriesService],
  bootstrap: [AppComponent]
})
export class AppModule { }