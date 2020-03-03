import { Routes } from '@angular/router'
import { TasksComponent } from './tasks/tasks.component'
import { FormTasksComponent } from './form-tasks/form-tasks.component'
import { LoginComponent } from './login/login.component'


export const ROUTES: Routes = [
    {path: '', redirectTo: '/login', pathMatch: 'full'},
    {path: 'tasks', component: TasksComponent},
    {path: 'form-tasks', component: FormTasksComponent},
    {path: 'edit/:id', component: FormTasksComponent},
    {path: 'end-tasks', component: TasksComponent},
    {path: 'login', component: LoginComponent}
]