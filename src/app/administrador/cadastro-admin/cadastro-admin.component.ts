import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, NgForm } from '@angular/forms';
import { Usuario } from 'src/app/model/usuario';
import { Usuarioadministrador } from 'src/app/model/usuarioadministrador';
import { AdministradorService } from 'src/app/service/administrador/administrador.service';
import { formatDate } from '@angular/common';

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
  ) {}

  ngOnInit() {}

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

  Cadastrar(form: NgForm) {
    this.usuarioAdm.dt_nascimento = formatDate(this.usuarioAdm.dt_nascimento,"MM-dd-yyyy","en-US");
    this.usuarioAdm.data_criacao = formatDate(Date.now(),"MM-dd-yyyy","en-US")
    console.log(this.usuarioAdm);
     this.administradorService.Cadastrar(this.usuarioAdm).subscribe( data =>  {
       alert('Usuário cadastrado com sucesso!');    
       }, err => { 
         alert('Ocorreu um erro ao cadastrar usuário!');
         console.error(err);                    
        }    
      );
  }
}
