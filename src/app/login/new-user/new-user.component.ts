import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { User } from './user.model';
import { PoNotificationService } from '@portinari/portinari-ui';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.css']
})
export class NewUserComponent implements OnInit {
  formUser: FormGroup

  user: User = {
    id: "",
    user: "",
    password: ""
  }
  
  constructor(private loginService: LoginService,
    private formBuilder: FormBuilder,
    private poNotification: PoNotificationService,
    private router: Router) { }
  
  ngOnInit() {
    this.formUser = this.formBuilder.group({
      id: [this.user.id],
      user: [this.user.user],
      pass: [this.user.password]
    })
  }

  saveUser() {
    this.loginService.postUser(this.formUser.value).subscribe(a => {
      this.poNotification.success("Usuário criado com sucesso!");
    });
    this.router.navigate(["/login"]);
  }
}
