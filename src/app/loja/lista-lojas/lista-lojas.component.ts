import { Component, OnInit, ViewChild } from '@angular/core';
import { Loja } from 'src/app/model/loja';
import { LojaService } from 'src/app/service/loja/loja.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lista-lojas',
  templateUrl: './lista-lojas.component.html',
  styleUrls: ['./lista-lojas.component.css']
})
export class ListaLojasComponent implements OnInit {

  lojas : Loja[];
  deleteModalRef: BsModalRef;


  @ViewChild('deleteModal', { static: true }) deleteModal;

  constructor(private service : LojaService,
    private modalService: BsModalService,
    private router: Router){}

  ngOnInit() {
    this.service.listar().subscribe(dados => this.lojas = dados);
  }

  editar(loja : Loja){
    this.service.lojaSelecionada = loja;
    console.log("Loja selecionada: "+this.service.lojaSelecionada)
    this.router.navigate(["home/cadastroloja"]);
  }

  deletar(loja : Loja){
    this.service.lojaSelecionada = loja;
    console.log("Loja selecionada: "+this.service.lojaSelecionada)
    this.deleteModalRef = this.modalService.show(this.deleteModal, {class: 'modal-sm'});
  }

  confirm(){
    console.log("selecionada Confirm: "+this.service.lojaSelecionada)
    this.service.remover(this.service.lojaSelecionada).subscribe(
      success => {alert("Loja Removida")  
      this.deleteModalRef.hide();
      this.service.listar().subscribe(dados => this.lojas = dados);


    }
    );
  }
 
  decline(): void {
   this.deleteModalRef.hide();
  }
}