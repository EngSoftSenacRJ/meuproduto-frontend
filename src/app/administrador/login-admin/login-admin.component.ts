import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/service/login/login.service';

@Component({
  selector: 'app-login-admin',
  templateUrl: './login-admin.component.html',
  styleUrls: ['./login-admin.component.css']
})
export class LoginAdminComponent implements OnInit {

  //login = {} as Login;
  retornoErro = new String();
  loginForm = ({
    username: '',
    password: '',
  });
  
  constructor(
    private router: Router,
    private loginService: LoginService
  ) {}

  ngOnInit() {
  }

  Acessar(form: NgForm) {
    
    //Validar Usuario e senha
       //Validar Usuario e senha
       this.loginService.Logar(this.loginForm.username, this.loginForm.password).subscribe( data =>  {

          console.log(data.token)
          this.loginService.token = data.token;
          this.loginService.IsAuthenticate = true;
          this.loginService.username = this.loginForm.username;
          this.router.navigate(["home"]);
        }, err => { 
          this.retornoErro = err;
          this.loginService.IsAuthenticate = false;
         }    
       );
    
  }

  ValidaCampos(form: NgForm): boolean {
    if (!form.valid) {
      this.retornoErro = "Informe Usuario e Senha";
      return false;
    } 
    return true;
  }
}
