import { Component, OnInit } from '@angular/core';
import { MarcaService } from 'src/app/service/marca/marca.service';
import { Router } from '@angular/router';
import { Marca } from 'src/app/model/marca';
import { NgForm } from '@angular/forms';
import { Produto } from 'src/app/model/produto';
import { Categoria } from 'src/app/model/categoria';
import { ProdutoService } from 'src/app/service/produto/produto.service';
import { CategoriaService } from 'src/app/service/categoria/categoria.service';
import { AlertModalService } from 'src/app/shared/alert-modal.service';

@Component({
  selector: 'app-cadastro-produto',
  templateUrl: './cadastro-produto.component.html',
  styleUrls: ['./cadastro-produto.component.css']
})
export class CadastroProdutoComponent implements OnInit {

  produto = {} as Produto;
  marcas : Marca[];
  categorias : Categoria[];

  constructor(
    private produtoService: ProdutoService,
    private categoriaService: CategoriaService,
    private marcaService: MarcaService,
    private router: Router,
    private alertService: AlertModalService) { }

  ngOnInit() {
  
      this.marcaService.listar().subscribe( data => {
        this.marcas = data;
      },
      err => { 
        this.alertService.showAlertDanger("Ocorreu um erro! Tente mais tarde.");
        console.error(err);                    
       });

      this.categoriaService.listar().subscribe( data => {
        this.categorias = data;
      },
      err => { 
        this.alertService.showAlertDanger('Ocorreu um erro ao carregar categorias!');
        console.error(err);                    
       });

    }

  salvar(form: NgForm){
    console.log(this.produto);
    this.produtoService.cadastrar(this.produto).subscribe( data => {
      this.router.navigate(["home/incluirproduto"]);
      this.alertService.showAlertSucces("Produto cadastrado com sucesso!");
    }, err =>{
      this.alertService.showAlertDanger("Ocorreu um erro ao cadastrar, tente novamente!");
      console.error("Erro: "+ err);
    });
  }

  retornar(form: NgForm){
    this.router.navigate(["home"]);
  }


}
