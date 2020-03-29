import { Component, OnInit } from '@angular/core';
import { Marca } from 'src/app/model/marca';
import { ListaMarcaComponent } from '../lista-marca/lista-marca.component';
import { MarcaService } from 'src/app/service/marca/marca.service';
import { LoginService } from 'src/app/service/login/login.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-cadastro-marca',
  templateUrl: './cadastro-marca.component.html',
  styleUrls: ['./cadastro-marca.component.css']
})
export class CadastroMarcaComponent implements OnInit {

  marca = {} as Marca;

  listaLoja: ListaMarcaComponent;
  constructor(
    private marcaService: MarcaService,
    private router: Router) { }

  ngOnInit() {
    console.log(this.marcaService.marcaSelecionada);
    if (this.marcaService.marcaSelecionada != undefined){
      this.marcaService.CarregarporMarcaSelecionada().subscribe( data => {
        this.marca = data;
        this.marca.id = null;
        console.log(this.marca);
      },
      err => { 
        alert('Ocorreu um erro ao carregar marca!');
        console.error(err);                    
       });

    }
  }

  salvar(form: NgForm){

    if(this.marcaService.marcaSelecionada != undefined){
      this.marcaService.editar(this.marcaService.marcaSelecionada,this.marca).subscribe(
        success => alert("Dados da marca alterados") 
      )
    }else{
      console.log(this.marca);
      this.marcaService.cadastrar(this.marca).subscribe( data => {
      this.retornar(form);
      alert("Marca cadastrada!");
      
    }, err =>{
      alert("Erro no cadastro!");
      console.error("Erro: "+err);
    }
  );
}
  }
  retornar(form: NgForm){
    form.reset();
    this.marcaService.marcaSelecionada = null;
    this.router.navigate(["home/marcas"]);
  }


}
