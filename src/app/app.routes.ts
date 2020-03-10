import { Routes } from '@angular/router'
import { AuthGuard } from './auth/auth.guard';

export const ROUTES: Routes = [
    {path: '', redirectTo: '/login', pathMatch: 'full'},
    {path: 'tasks', loadChildren: '.tasks/tasks.module#TasksModule', canActivate: [AuthGuard]},
    {path: 'categories', loadChildren: './categories/categories.module#CategoriesModule', canActivate: [AuthGuard]},
    {path: 'form-categories', loadChildren: './categories/categories.module#CategoriesModule', canActivate: [AuthGuard]},
    {path: 'edit-category/:id', loadChildren: './categories/categories.module#CategoriesModule', canActivate: [AuthGuard]},
    {path: 'login', loadChildren: './login/login.module#LoginModule'}
]