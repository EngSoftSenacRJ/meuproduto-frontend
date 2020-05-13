import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/service/login/login.service';
import { LojaService } from 'src/app/service/loja/loja.service';
import { ProdutoService } from 'src/app/service/produto/produto.service';
import { Produto } from 'src/app/model/produto';
import { Loja } from 'src/app/model/loja';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-logproduto',
  templateUrl: './logproduto.component.html',
  styleUrls: ['./logproduto.component.css']
})
export class LogprodutoComponent implements OnInit {

  produtos: Produto[];
  lojas: Loja[];
  resultado: any;
  pesquisando: boolean = true;
  pesqform = ({
    idLoja: 0,
    idProduto: 0,
  });

  key: string = 'nomeLoja'; // Define um valor padrão, para quando inicializar o componente
    reverse: boolean = false;
    sort(key) {
        this.key = key;
        this.reverse = !this.reverse;
    }
  
  constructor(
    private lojaService: LojaService,
    private produtoService: ProdutoService,
  ) { }

  ngOnInit() {

    this.lojaService.listar().subscribe(dados => {
      this.lojas = dados;
      console.log(this.lojas);
    });

    this.produtoService.listar().subscribe(dados => {
      this.produtos = dados;
    });

  }
  
  pesquisar(form: NgForm) {

    this.produtoService.listarAuditoria(this.pesqform.idLoja,this.pesqform.idProduto).subscribe(
      dados => this.resultado = dados
    );  

    this.pesquisando=false;
  }

  Voltar() {
    this.pesquisando=true;
  }

}
