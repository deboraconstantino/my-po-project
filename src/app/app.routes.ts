import { Routes } from '@angular/router'
import { TasksComponent } from './tasks/tasks.component'
import { FormTasksComponent } from './form-tasks/form-tasks.component'
import { LoginComponent } from './login/login.component'
import { AuthGuard } from './auth/auth.guard';

export const ROUTES: Routes = [
    {path: '', redirectTo: '/login', pathMatch: 'full'},
    {path: 'tasks', component: TasksComponent, canActivate: [AuthGuard]},
    {path: 'form-tasks', component: FormTasksComponent, canActivate: [AuthGuard]},
    {path: 'edit/:id', component: FormTasksComponent, canActivate: [AuthGuard]},
    {path: 'end-tasks', component: TasksComponent, canActivate: [AuthGuard]},
    {path: 'login', component: LoginComponent}
]