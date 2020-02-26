import { Component, OnInit } from '@angular/core';
import {TesteService} from '../../service/teste/teste.service';
import { LoginService } from 'src/app/service/login/login.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
 
  IsAdmin = false;
  IsFuncionario = false;
  IsLogado = false;  

  constructor(
    private loginService: LoginService
  ) { }

  ngOnInit() {
    if (this.loginService.IsAuthenticate) {
      //TODO: Validar perfil
      this.IsAdmin = true;
      this.IsFuncionario = false;
      this.IsLogado = true;
    } else {
      this.IsAdmin = false;
      this.IsFuncionario = false;
      this.IsLogado = false;
    }      

  }

  logout() {
     this.IsLogado = false;
     this.IsFuncionario = false;
     this.IsAdmin = false;  

    //TODO: Fazer chamada logout
    // this.loginService.logout().subscribe( data =>  {  
    //    alert('Usuario saiu do sistema!')
    //    }, err => { 
    //     alert('Ocorreu um erro ao efetuar logout!')
    //      console.log(err);
    //     }    
    // );
  }

}


