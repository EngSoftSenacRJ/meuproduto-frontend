import { Component, OnInit } from '@angular/core';
import { Loja } from 'src/app/model/loja';
import { LojaService } from 'src/app/service/loja/loja.service';
import { NgForm, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-cadastro-loja',
  templateUrl: './cadastro-loja.component.html',
  styleUrls: ['./cadastro-loja.component.css']
})
export class CadastroLojaComponent implements OnInit {

  loja = {} as Loja;

  constructor(
    private lojaService: LojaService) { }

  ngOnInit() {}

  salvar(form: NgForm){
    this.loja.estadoEnderecoComercial = "Rio de Janeiro";
    this.loja.emailUsuarioCriadorLoja = "carmen@gmail.com";
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
