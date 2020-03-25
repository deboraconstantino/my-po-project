import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Routes } from '@angular/router'
import { BrowserModule } from '@angular/platform-browser';
import { LoginComponent } from './login.component';
import { LoginService } from './login.service';
import { PoPageLoginModule, PoModalPasswordRecoveryModule } from '@portinari/portinari-templates';
import { PoPageModule, PoFieldModule, PoModule } from '@portinari/portinari-ui';
import { NewUserComponent } from './new-user/new-user.component';
import { ReactiveFormsModule } from '@angular/forms';

const ROUTES: Routes = [
    {path: 'login', component: LoginComponent},
    {path: 'new-user', component: NewUserComponent}
]

@NgModule({
  declarations: [
    LoginComponent,
    NewUserComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(ROUTES),
    PoPageLoginModule,
    PoModalPasswordRecoveryModule,
    PoPageModule,
    PoFieldModule,
    PoModule,
    ReactiveFormsModule
  ],
  providers: [LoginService]
})
export class LoginModule { }