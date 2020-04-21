import { Component, OnInit, ViewChild } from '@angular/core';
import { Loja } from 'src/app/model/loja';
import { LojaService } from 'src/app/service/loja/loja.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AlertModalService } from 'src/app/shared/alert-modal.service';


@Component({
  selector: 'app-lista-lojas',
  templateUrl: './lista-lojas.component.html',
  styleUrls: ['./lista-lojas.component.css']
})
export class ListaLojasComponent implements OnInit {

  key: string = 'nome'; // Define um valor padrão, para quando inicializar o componente
    reverse: boolean = false;
    sort(key) {
        this.key = key;
        this.reverse = !this.reverse;
    }

  lojas : Loja[];
  modalRef: BsModalRef;
  editProfileForm: FormGroup;

  @ViewChild('deleteModal', { static: true }) deleteModal;
  @ViewChild('viewModal', { static: true }) viewModal;

  constructor(private service : LojaService,
    private modalService: BsModalService,
    private router: Router,
    private fb: FormBuilder,
    private alertService: AlertModalService){}

  ngOnInit() {
    this.service.listar().subscribe(dados => this.lojas = dados);

    this.editProfileForm = this.fb.group({
      nomeLoja:  [''],
      razaoSocial:  [''],
      cnpj:  [''],
      telefoneContato:  [''],
      ruaEndereco:  [''],
      numeroEndereco: [''],
      bairroEndereco:  [''],
      cidadeEndereco:  [''],
      estadoEndereco:  [''],
      cep:  [''],
    });
  }

  editar(loja : Loja){
    this.service.lojaSelecionada = loja;
    console.log("Loja selecionada: "+this.service.lojaSelecionada)
    this.router.navigate(["home/cadastroloja"]);
  }

  deletar(loja : Loja){
    this.service.lojaSelecionada = loja;
    console.log("Loja selecionada: "+this.service.lojaSelecionada)
    this.modalRef = this.modalService.show(this.deleteModal, {class: 'modal-sm'});
  }

  detalhar(loja: Loja){
    console.log("Loja selecionada: "+loja.nome);
    this.modalService.show(this.viewModal, {class: 'modal-lg'});
    this.editProfileForm.patchValue({
      nomeLoja: loja.nome,
      razaoSocial: loja.razaoSocial,
      cnpj: loja.cnpj,
      telefoneContato: loja.telefoneContato,
      ruaEndereco: loja.ruaEnderecoComercial,
      numeroEndereco: loja.numeroEnderecoComercial,
      bairroEndereco: loja.bairroEnderecoComercial,
      cidadeEndereco: loja.cidadeEnderecoComercial,
      estadoEndereco: loja.estadoEnderecoComercial,
      cep: loja.cepEnderecoComercial,
    });
    this.editProfileForm.disable();
  }

  confirm(){
    console.log("selecionada Confirm: "+this.service.lojaSelecionada)
    this.service.remover(this.service.lojaSelecionada).subscribe(
      success => {this.alertService.showAlertSucces("Loja foi removida com sucesso!");
      this.modalRef.hide();
      this.service.listar().subscribe(dados => this.lojas = dados);
    }
    );
  }
 
  decline(): void {
    this.modalService.hide(1);
  }

  // formatarTelefone(numero:any){
  //   let telefone: any = parsePhoneNumberFromString(numero,'BR');
  //   console.log("telefone: "+telefone);
  //   return telefone
  // }

}