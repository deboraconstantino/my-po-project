import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Routes } from '@angular/router'
import { BrowserModule } from '@angular/platform-browser';
import { LoginComponent } from './login.component';
import { LoginService } from './login.service';
import { PoPageLoginModule, PoModalPasswordRecoveryModule } from '@portinari/portinari-templates';
import { PoPageModule } from '@portinari/portinari-ui';

const ROUTES: Routes = [
    {path: 'login', component: LoginComponent}
]

@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(ROUTES),
    PoPageLoginModule,
    PoModalPasswordRecoveryModule,
    PoPageModule
  ],
  providers: [LoginService]
})
export class LoginModule { }