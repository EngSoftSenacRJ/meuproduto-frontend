import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, NgForm } from '@angular/forms';
import { Usuario } from 'src/app/model/usuario';
import { Usuarioadministrador } from 'src/app/model/usuarioadministrador';
import { AdministradorService } from 'src/app/service/administrador/administrador.service';
import { formatDate } from '@angular/common';
import { LoginService } from 'src/app/service/login/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cadastro-admin',
  templateUrl: './cadastro-admin.component.html',
  styleUrls: ['./cadastro-admin.component.css']
})
export class CadastroAdminComponent implements OnInit {

  usuarioAdm  = {} as Usuarioadministrador;
  usuarioLogado = {} as Usuarioadministrador;

  CPFmask = [/\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '-', /\d/, /\d/];
  Telmask = ['(', /\d/, /\d/, ')', /\d/, /\d/, /\d/,/\d/,/\d/, '-',/\d/, /\d/, /\d/, /\d/,];
  CEPmask = [/\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/,];

  step = 0;
  hide = true;

  constructor(
    private administradorService: AdministradorService,
    private loginService: LoginService,
    private router: Router
  ) {}

  ngOnInit() {
    
    if (this.loginService.IsAuthenticate == true) {
      this.administradorService.CarregarporUsernameLogado().subscribe( data =>  {
        console.log(data);    
        this.usuarioLogado = data;

        this.usuarioAdm.nome = this.usuarioLogado.nome;
        this.usuarioAdm.cpf = this.usuarioLogado.cpf;
        this.usuarioAdm.dataAniversario = this.usuarioLogado.dataAniversario;
        this.usuarioAdm.ruaEnderecoPessoal = this.usuarioLogado.ruaEnderecoPessoal;
        this.usuarioAdm.numeroEnderecoPessoal = this.usuarioLogado.numeroEnderecoPessoal;
        this.usuarioAdm.cepEnderecoPessoal = this.usuarioLogado.cepEnderecoPessoal;
        this.usuarioAdm.bairroEnderecoPessoal = this.usuarioLogado.bairroEnderecoPessoal;
        this.usuarioAdm.cidadeEnderecoPessoal = this.usuarioLogado.cidadeEnderecoPessoal;
        this.usuarioAdm.estadoEnderecoPessoal = this.usuarioLogado.estadoEnderecoPessoal;
        this.usuarioAdm.username = this.usuarioLogado.username;
        this.usuarioAdm.password = this.usuarioLogado.password; 
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

  // email = new FormControl('', [Validators.required, Validators.email]);

  // getErrorMessage() {
  //   return this.email.hasError('required') ? 'You must enter a value' :
  //       this.email.hasError('email') ? 'Not a valid email' :
  //           '';
  // }

  Salvar(form: NgForm) {
    this.usuarioAdm.dataAniversario = formatDate(this.usuarioAdm.dataAniversario,"dd/MM/yyyy","en-US");
    this.usuarioAdm.usuarioType = "ADMINISTRADOR";
    console.log(this.usuarioAdm);

    if (this.usuarioLogado.id == undefined) {

      this.administradorService.Cadastrar(this.usuarioAdm).subscribe( data =>  {
        alert('Usuário cadastrado com sucesso! \n Acesse sua caixa de entrada para validar o cadastro!');  
        this.router.navigate(["/home"]);
        }, err => { 
          alert('Ocorreu um erro ao cadastrar usuário!');
          console.error(err);                    
         }    
       );

    } else {
      console.log(this.usuarioAdm);
      this.administradorService.Editar(this.usuarioLogado.id, this.usuarioAdm).subscribe( data =>  {
        alert('Usuário alterado com sucesso!');    
        this.router.navigate(["/home"]);
        }, err => { 
          alert('Ocorreu um erro ao alterar usuário!');
          console.error(err);                    
         }    
       );

    }
     
  }
}
