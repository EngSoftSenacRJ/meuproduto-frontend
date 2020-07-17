import { Component, OnInit } from '@angular/core';
import { Marca } from 'src/app/model/marca';
import { MarcaService } from 'src/app/service/marca/marca.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { AlertModalService } from 'src/app/shared/alert-modal.service';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-cadastro-marca',
  templateUrl: './cadastro-marca.component.html',
  styleUrls: ['./cadastro-marca.component.css']
})
export class CadastroMarcaComponent implements OnInit {

  marca = {} as Marca;
  bsModalRef: BsModalRef;


  constructor(
    private marcaService: MarcaService,
    private router: Router,
    private alertService: AlertModalService) { }

  ngOnInit() {
    if (this.marcaService.marcaSelecionada != undefined){
      this.marcaService.CarregarporMarcaSelecionada().subscribe( data => {
        this.marca = data;
        this.marca.id = null;
      },
      err => { 
        this.alertService.showAlertDanger('Ocorreu um erro ao carregar marca! '+err);                    
       });

    }
  }

  salvar(form: NgForm){

    if(this.marcaService.marcaSelecionada != undefined){
      this.marcaService.editar(this.marcaService.marcaSelecionada,this.marca).subscribe(
        data =>  {
          this.router.navigate(["home/marcas"]);
          this.alertService.showAlertInfo("Dados da marca alterados");
        }
      )
    }else{
      this.marcaService.cadastrar(this.marca).subscribe( data => {
      this.router.navigate(["home/marcas"]);
      this.alertService.showAlertSucces("Marca cadastrada!");
    }, err =>{
      this.alertService.showAlertDanger("Erro no cadastro!" +err);
    }
  );
}
  }

  retornar(form: NgForm){
    this.router.navigate(["home/marcas"]);
  }

}
