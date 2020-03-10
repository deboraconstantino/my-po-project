import { Routes } from '@angular/router'
import { AuthGuard } from './auth/auth.guard';
import { FormTasksComponent } from './tasks/form-tasks/form-tasks.component';
import { TasksComponent } from './tasks/tasks.component';

export const ROUTES: Routes = [
    {path: '', redirectTo: '/login', pathMatch: 'full'},
    {path: 'tasks', component: TasksComponent, canActivate: [AuthGuard]},
    {path: 'form-tasks', component: FormTasksComponent, canActivate: [AuthGuard]},
    {path: 'edit/:id', component: FormTasksComponent, canActivate: [AuthGuard]},
    {path: 'end-tasks', component: TasksComponent, canActivate: [AuthGuard]},
    {path: 'categories', loadChildren: './categories/categories.module#CategoriesModule', canActivate: [AuthGuard]},
    {path: 'login', loadChildren: './login/login.module#LoginModule'}
]