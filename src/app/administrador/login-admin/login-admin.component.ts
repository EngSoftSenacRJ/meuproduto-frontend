import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-admin',
  templateUrl: './login-admin.component.html',
  styleUrls: ['./login-admin.component.css']
})
export class LoginAdminComponent implements OnInit {

  //login = {} as Login;
  retornoErro = new String();
  
  constructor(
    private router: Router,
    //private loginService: LoginService
  ) {}

  ngOnInit() {
  }

  Acessar(form: NgForm) {
    
    //Validar Usuario e senha
    
  }

  ValidaCampos(form: NgForm): boolean {
    if (!form.valid) {
      this.retornoErro = "Informe Usuario e Senha";
      return false;
    } 
    return true;
  }
}
