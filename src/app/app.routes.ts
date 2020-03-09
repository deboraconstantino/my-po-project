import { Routes } from '@angular/router'
import { TasksComponent } from './tasks/tasks.component'
import { FormTasksComponent } from './tasks/form-tasks/form-tasks.component'
import { LoginComponent } from './login/login.component'
import { AuthGuard } from './auth/auth.guard';
import { CategoriesComponent } from './categories/categories.component';
import { FormCategoriesComponent } from './categories/form-categories/form-categories.component';

export const ROUTES: Routes = [
    {path: '', redirectTo: '/login', pathMatch: 'full'},
    {path: 'tasks', component: TasksComponent, canActivate: [AuthGuard]},
    {path: 'form-tasks', component: FormTasksComponent, canActivate: [AuthGuard]},
    {path: 'edit/:id', component: FormTasksComponent, canActivate: [AuthGuard]},
    {path: 'end-tasks', component: TasksComponent, canActivate: [AuthGuard]},
    {path: 'categories', loadChildren: './categories/categories.module#CategoriesModule', canActivate: [AuthGuard]},
    {path: 'form-categories', loadChildren: './categories/categories.module#CategoriesModule', canActivate: [AuthGuard]},
    {path: 'edit-category/:id', loadChildren: './categories/categories.module#CategoriesModule', canActivate: [AuthGuard]},
    {path: 'login', component: LoginComponent}
]