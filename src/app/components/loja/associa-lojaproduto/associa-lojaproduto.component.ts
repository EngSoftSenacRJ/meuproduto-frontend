import { Component, OnInit } from '@angular/core';
import { Loja } from 'src/app/model/loja';
import { Produto } from 'src/app/model/produto';
import { LojaService } from 'src/app/service/loja/loja.service';
import { ProdutoService } from 'src/app/service/produto/produto.service';

@Component({
  selector: 'app-associa-lojaproduto',
  templateUrl: './associa-lojaproduto.component.html',
  styleUrls: ['./associa-lojaproduto.component.css']
})
export class AssociaLojaprodutoComponent implements OnInit {

  lojas: Loja[];
  produtos: any[];
  
  constructor(private lojaService: LojaService,
    private produtoService: ProdutoService) { }

  ngOnInit() {
    this.lojaService.listar().subscribe(dados => {
      this.lojas = dados;
      console.log(dados);
    });
    this.produtoService.listar().subscribe(dados => {
      this.produtos = dados;
      console.log("TS dados:"+dados);  
      console.log("Associa prods: "+this.produtos);  
    });


  
  }

}
