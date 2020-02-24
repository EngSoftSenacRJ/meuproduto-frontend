import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, NgForm } from '@angular/forms';
import { Usuario } from 'src/app/model/usuario';
import { Usuarioadministrador } from 'src/app/model/usuarioadministrador';
import { AdministradorService } from 'src/app/service/administrador/administrador.service';
import { formatDate } from '@angular/common';
import { LoginService } from 'src/app/service/login/login.service';

@Component({
  selector: 'app-cadastro-admin',
  templateUrl: './cadastro-admin.component.html',
  styleUrls: ['./cadastro-admin.component.css']
})
export class CadastroAdminComponent implements OnInit {

  usuarioAdm = {} as Usuarioadministrador;

  CPFmask = [/\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '-', /\d/, /\d/];
  Telmask = ['(', /\d/, /\d/, ')', /\d/, /\d/, /\d/,/\d/,/\d/, '-',/\d/, /\d/, /\d/, /\d/,];

  step = 0;
  hide = true;

  constructor(
    private administradorService: AdministradorService,
    private loginService: LoginService,
  ) {}

  ngOnInit() {
    
    if (this.loginService.IsAuthenticate == true) {
      this.administradorService.CarregarporUsernameLogado().subscribe( data =>  {
        console.log(data);    
        this.usuarioAdm = data;
        }, err => { 
          alert('Ocorreu um erro ao carregar usuário!');
          console.error(err);                    
         }    
       );
    }

  }

  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }

  email = new FormControl('', [Validators.required, Validators.email]);

  getErrorMessage() {
    return this.email.hasError('required') ? 'You must enter a value' :
        this.email.hasError('email') ? 'Not a valid email' :
            '';
  }

  Salvar(form: NgForm) {
    this.usuarioAdm.dataAniversario = formatDate(this.usuarioAdm.dataAniversario,"dd/MM/yyyy","en-US");
    this.usuarioAdm.usuarioType = "ADMINISTRADOR"
    console.log(this.usuarioAdm);

    if (this.usuarioAdm.id == undefined) {

      this.administradorService.Cadastrar(this.usuarioAdm).subscribe( data =>  {
        alert('Usuário cadastrado com sucesso!');    
        }, err => { 
          alert('Ocorreu um erro ao cadastrar usuário!');
          console.error(err);                    
         }    
       );

    } else {
      
      this.administradorService.Editar(this.usuarioAdm).subscribe( data =>  {
        alert('Usuário alterado com sucesso!');    
        }, err => { 
          alert('Ocorreu um erro ao alterar usuário!');
          console.error(err);                    
         }    
       );

    }
     
  }
}
