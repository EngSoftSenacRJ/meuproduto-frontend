import { Component, OnInit } from '@angular/core';
import { Loja } from 'src/app/model/loja';
import { LojaService } from 'src/app/service/loja/loja.service';
import { NgForm } from '@angular/forms';
import { LoginService } from 'src/app/service/login/login.service';

@Component({
  selector: 'app-cadastro-loja',
  templateUrl: './cadastro-loja.component.html',
  styleUrls: ['./cadastro-loja.component.css']
})
export class CadastroLojaComponent implements OnInit {

  loja = {} as Loja;

  constructor(
    private lojaService: LojaService,
    private loginService: LoginService) { }

  ngOnInit() {}

  salvar(form: NgForm){
    this.loja.emailUsuarioCriadorLoja = this.loginService.username;
    console.log("Loja "+this.loja.nome);
    this.lojaService.cadastrar(this.loja).subscribe( data => {
      alert("Loja cadastrada!");
    }, err =>{
      alert("Erro no cadastro!");
      console.error("Esse é o erro: "+err);
    }
  );

  }

}
