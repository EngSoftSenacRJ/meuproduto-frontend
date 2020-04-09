import { Component, OnInit, ViewChild } from '@angular/core';
import { Loja, ProdutoPrecoSet } from 'src/app/model/loja';
import { Produto } from 'src/app/model/produto';
import { LojaService } from 'src/app/service/loja/loja.service';
import { ProdutoService } from 'src/app/service/produto/produto.service';
import { NgForm } from '@angular/forms';
import { LojasProdutos } from 'src/app/model/lojasProdutos';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';

@Component({
  selector: 'app-associa-lojaproduto',
  templateUrl: './associa-lojaproduto.component.html',
  styleUrls: ['./associa-lojaproduto.component.css']
})
export class AssociaLojaprodutoComponent implements OnInit {


  associacao= {} as LojasProdutos;
  lojaPreco: any;
  produtos: Produto[];
  lojas: Loja[];
  modalRef: BsModalRef;


  @ViewChild('deleteModal', { static: true }) deleteModal;

  constructor(private lojaService: LojaService,
    private produtoService: ProdutoService,
    private modalService: BsModalService) { }

  ngOnInit() {
    this.lojaService.listar().subscribe(dados => {
      this.lojas = dados;
      console.log(dados);
    });

    this.produtoService.listar().subscribe(dados => {
      this.produtos = dados;
    });

       this.lojaService.listarByLoja(1).subscribe(dados => {
          this.lojaPreco = dados;
          console.log(dados);
          console.log("this.lojas: "+this.lojaPreco.produtoPrecoSet[0].produtoResource.nome);
        });
  }


  salvar(form: NgForm){
    console.log("Loja: "+this.associacao.idLoja);
    console.log("Produto: "+this.associacao.idProduto);
    console.log("Preco: "+this.associacao.preco);
    this.produtoService.associarComLoja(this.associacao).subscribe( data => {
      alert("Produto cadastrado!");
      form.reset();
    }, err =>{
      alert(err);
      console.error("Erro: "+ err);
    });
  }

  deletar(id:number){
    this.produtoService.idAssociacaoSelecionada = id;
    
    console.log("id produto selecionada: "+this.produtoService.idAssociacaoSelecionada);
    this.modalRef = this.modalService.show(this.deleteModal, {class: 'modal-sm'});
  }

  confirm(){
   
    this.produtoService.removerProdutoLoja(this.produtoService.idAssociacaoSelecionada).subscribe(
      success => {alert("Produto desassociado com sucesso!!!")  
      this.modalRef.hide();
      this.lojaService.listarByLoja(1).subscribe(dados => this.lojaPreco = dados);
  }
  );
}
 
  decline(): void {
   this.modalRef.hide();
  }

}
