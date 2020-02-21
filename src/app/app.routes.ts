import { Routes } from '@angular/router'
import { TasksComponent } from './tasks/tasks.component'
import { FormTasksComponent } from './form-tasks/form-tasks.component'


export const ROUTES: Routes = [
    {path: '', component: TasksComponent},
    {path: 'form-tasks', component: FormTasksComponent}
]