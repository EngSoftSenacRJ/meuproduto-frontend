import { Component, OnInit } from '@angular/core';
import {TesteService} from '../../service/teste/teste.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
 
  IsAdmin = true;
  IsFuncionario = false;
  IsLogado = true;  
  constructor(
    private testeService: TesteService
  ) { }

  ngOnInit() {
  }

  logout() {
    this.IsLogado = false;
    this.IsFuncionario = false;
    this.IsAdmin = false;  

    //Validar Usuario e senha
    this.testeService.teste().subscribe( data =>  {
      console.log(data);     
      
      }, err => { 
        console.log(err);
       }    
     );
  }

}


