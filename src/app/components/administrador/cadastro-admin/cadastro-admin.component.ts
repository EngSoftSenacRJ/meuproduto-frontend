import { Component, OnInit } from '@angular/core';
import { NgForm, FormControl } from '@angular/forms';
import { Usuarioadministrador } from 'src/app/model/usuarioadministrador';
import { AdministradorService } from 'src/app/service/administrador/administrador.service';
import { formatDate } from '@angular/common';
import { LoginService } from 'src/app/service/login/login.service';
import { Router } from '@angular/router';
import {  MAT_MOMENT_DATE_FORMATS,  MomentDateAdapter,  MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import { AlertModalService } from 'src/app/shared/alert-modal.service';

@Component({
  selector: 'app-cadastro-admin',
  templateUrl: './cadastro-admin.component.html',
  styleUrls: ['./cadastro-admin.component.css'],
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
export class CadastroAdminComponent implements OnInit {

  usuarioAdm  = {} as Usuarioadministrador;
  usuarioLogado: number;
  dateF: Date;

  CPFmask = [/\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '-', /\d/, /\d/];
  Telmask = ['(', /\d/, /\d/, ')', /\d/, /\d/, /\d/,/\d/,/\d/, '-',/\d/, /\d/, /\d/, /\d/,];
  CEPmask = [/\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/];

  hide = true;

  constructor(
    private administradorService: AdministradorService,
    private loginService: LoginService,
    private router: Router,
    private _adapter: DateAdapter<any>,
    private alertService: AlertModalService
  ) {}

  ngOnInit() {

    if (this.loginService.IsAuthenticate == true) {
      this.administradorService.CarregarporUsernameLogado().subscribe( data =>  {

        this.usuarioAdm = data;
        this.usuarioLogado = this.usuarioAdm.id;
        this.usuarioAdm.id = null;

        var dateArray = this.usuarioAdm.dataAniversario.split("/");
        this.dateF = new Date(dateArray[1] + "-" + dateArray[0] + "-" + dateArray[2]);

        
        }, err => { 
          this.alertService.showAlertDanger('Ocorreu um erro ao carregar o usuário!');
          console.error(err);                    
         }    
       );
    }

  }

  Salvar(form: NgForm) {
    this.usuarioAdm.dataAniversario = formatDate(this.dateF,"dd/MM/yyyy","en-US");
    this.usuarioAdm.telefoneContato = this.usuarioAdm.telefoneContato.toString().replace("(","").replace(")","").replace("-","");
    this.usuarioAdm.cpf = Number(this.usuarioAdm.cpf.toString().replace(".","").replace(".","").replace("-",""));
    this.usuarioAdm.cepEnderecoPessoal = Number(this.usuarioAdm.cepEnderecoPessoal.toString().replace(".","").replace("-",""));
    this.usuarioAdm.usuarioType = "ADMINISTRADOR";
    console.log(this.usuarioAdm);

    if (!this.loginService.IsAuthenticate) {

      this.administradorService.Cadastrar(this.usuarioAdm).subscribe( data =>  {
        this.alertService.showAlertSucces('Usuário cadastrado com sucesso! \n Acesse sua caixa de entrada para validar o cadastro!');
        this.router.navigate(["/home"]);
        }, err => { 
          this.alertService.showAlertDanger('Ocorreu um erro ao cadastrar usuário!');
          console.error(err);                    
         }    
       );

    } else {
      console.log(this.usuarioAdm);
      this.administradorService.Editar(this.usuarioLogado, this.usuarioAdm).subscribe( data =>  {
        this.alertService.showAlertSucces('Dados do Usuário alterado com sucesso!');
        this.router.navigate(["/home"]);
        }, err => { 
          this.alertService.showAlertDanger('Ocorreu um erro ao alterar usuário!');
          console.error(err);                    
         }    
       );

    }
     
  }
}