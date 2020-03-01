import { Component, OnInit } from '@angular/core';
import { Loja } from 'src/app/model/loja';
import { LojaService } from 'src/app/service/loja/loja.service';
import { NgForm } from '@angular/forms';
import { LoginService } from 'src/app/service/login/login.service';
import { Router } from '@angular/router';
import { ListaLojasComponent } from '../lista-lojas/lista-lojas.component';

@Component({
  selector: 'app-cadastro-loja',
  templateUrl: './cadastro-loja.component.html',
  styleUrls: ['./cadastro-loja.component.css']
})
export class CadastroLojaComponent implements OnInit {

  loja = {} as Loja;

  listaLoja: ListaLojasComponent;
  constructor(
    private lojaService: LojaService,
    private loginService: LoginService,
    private router: Router) { }

  ngOnInit() {
    if (this.lojaService.lojaSelecionada != undefined){
      this.lojaService.CarregarporLojaSelecionada().subscribe( data => {
        this.loja = data;
        this.loja.id = null;
        console.log("id da loja: "+this.loja.id);
      },
      err => { 
        alert('Ocorreu um erro ao carregar usuário!');
        console.error(err);                    
       });

    }
  }

  salvar(form: NgForm){

    if(this.lojaService.lojaSelecionada != undefined){
      console.log("entrou no salvar parte edição");
      console.log("Loja selecionada: "+this.lojaService.lojaSelecionada)
      this.lojaService.editar(this.lojaService.lojaSelecionada,this.loja).subscribe(
        success => alert("Dados da loja alterados") 
      )
    }else{
    this.loja.emailUsuarioCriadorLoja = this.loginService.username;
    console.log("Loja "+this.loja.nome);
    this.lojaService.cadastrar(this.loja).subscribe( data => {
      this.retornar(form);
      alert("Loja cadastrada!");
      
    }, err =>{
      alert("Erro no cadastro!");
      console.error("Esse é o erro: "+err);
    }
  );
}
  }
  retornar(form: NgForm){
    form.reset();
    this.lojaService.lojaSelecionada = null;
    this.router.navigate(["home/lojas"]);
  }

}
