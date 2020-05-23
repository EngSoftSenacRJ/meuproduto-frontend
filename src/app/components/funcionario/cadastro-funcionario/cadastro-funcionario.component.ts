import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Usuarioadministrador } from 'src/app/model/usuarioadministrador';
import { formatDate } from '@angular/common';
import { LoginService } from 'src/app/service/login/login.service';
import { Router } from '@angular/router';
import { FuncionarioService } from 'src/app/service/funcionario/funcionario.service';
import {  MAT_MOMENT_DATE_FORMATS,  MomentDateAdapter,  MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import { AlertModalService } from 'src/app/shared/alert-modal.service';
import { LojaService } from 'src/app/service/loja/loja.service';
import { Loja } from 'src/app/model/loja';										  

@Component({
  selector: 'app-cadastro-funcionario',
  templateUrl: './cadastro-funcionario.component.html',
  styleUrls: ['./cadastro-funcionario.component.css'],
  providers: [
    {provide: MAT_DATE_LOCALE, useValue: 'pt-BR'},
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },
    {provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS},
  ],
})
export class CadastroFuncionarioComponent implements OnInit {

  funcionario = {} as Usuarioadministrador;
  lojas: Loja[];
  dateF: Date;

  CPFmask = [/\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '-', /\d/, /\d/];
  Telmask = ['(', /\d/, /\d/, ')', /\d/, /\d/, /\d/,/\d/,/\d/, '-',/\d/, /\d/, /\d/, /\d/,];
  CEPmask = [/\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/];
	hide = true;		  

  constructor(
    private funcionarioService: FuncionarioService,
    private loginService: LoginService,
	  private lojaService: LojaService,
    private router: Router,
    private alertService: AlertModalService
  ) {}

  ngOnInit() {
    
    if (this.funcionarioService.funcionarioSelecionado != undefined){

      this.funcionarioService.CarregarporFuncionarioSelecionado().subscribe( data => {
        this.funcionario = data;
        //this.funcionario.id = null;
		    this.funcionario.lojaId = this.funcionario.lojaResource.id;														   
        console.log(data);
        var dateArray = this.funcionario.dataAniversario.split("/");
        this.dateF = new Date(dateArray[1] + "-" + dateArray[0] + "-" + dateArray[2]);
      },
      err => { 
        this.alertService.showAlertDanger('Ocorreu um erro ao carregar Funcionario!');
        console.error(err);                    
       });
    }

    this.lojaService.listar().subscribe(dados => {
      this.lojas = dados;
      console.log(this.lojas);
    });
  
  }

  Salvar(form: NgForm) {

	  delete  this.funcionario.id;							
    this.funcionario.dataAniversario = formatDate(this.dateF,"dd/MM/yyyy","en-US");
    this.funcionario.telefoneContato = this.funcionario.telefoneContato.toString().replace("(","").replace(")","").replace("-","");
    this.funcionario.cpf = Number(this.funcionario.cpf.toString().replace(".","").replace(".","").replace("-",""));
    this.funcionario.cepEnderecoPessoal = Number(this.funcionario.cepEnderecoPessoal.toString().replace(".","").replace("-",""));
    this.funcionario.usuarioType = "FUNCIONARIO";
    this.funcionario.enabled = true;
    this.funcionario.usernameAdministrador = this.loginService.username;

    if (this.funcionarioService.funcionarioSelecionado == undefined) {
      
      this.funcionarioService.Cadastrar(this.funcionario).subscribe( data =>  {
       this.alertService.showAlertSucces('Funcionario cadastrado com sucesso!');
        this.router.navigate(["home/funcionarios"]);
        }, err => { 
          this.alertService.showAlertDanger('Ocorreu um erro ao cadastrar funcionario!');
          console.error(err);                    
         }    
       );

    } else {

	  if (this.funcionario.password != undefined && this.funcionario.password != "") {
        this.funcionario.newPassword = this.funcionario.password;
      }	

    this.funcionarioService.Editar(this.funcionarioService.funcionarioSelecionado, this.funcionario).subscribe( data =>  {
        this.alertService.showAlertSucces('Funcionario alterado com sucesso!');
        this.router.navigate(["home/funcionarios"]);
        }, err => { 
          this.alertService.showAlertDanger('Ocorreu um erro ao alterar Funcionario!');
          console.error(err);                    
         }    
       );

    }
     
  }

  retornar(form: NgForm){
    this.router.navigate(["home/funcionarios"]);
  }

}
