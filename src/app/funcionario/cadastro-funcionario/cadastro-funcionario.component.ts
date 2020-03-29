import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Usuarioadministrador } from 'src/app/model/usuarioadministrador';
import { AdministradorService } from 'src/app/service/administrador/administrador.service';
import { formatDate } from '@angular/common';
import { LoginService } from 'src/app/service/login/login.service';
import { Router } from '@angular/router';
import { FuncionarioService } from 'src/app/service/funcionario/funcionario.service';

@Component({
  selector: 'app-cadastro-funcionario',
  templateUrl: './cadastro-funcionario.component.html',
  styleUrls: ['./cadastro-funcionario.component.css']
})
export class CadastroFuncionarioComponent implements OnInit {

  funcionario = {} as Usuarioadministrador;
  dataSelecionada = new Date();

  CPFmask = [/\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '-', /\d/, /\d/];
  Telmask = ['(', /\d/, /\d/, ')', /\d/, /\d/, /\d/,/\d/,/\d/, '-',/\d/, /\d/, /\d/, /\d/,];
  CEPmask = [/\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/];

  step = 0;
  hide = true;

  constructor(
    private funcionarioService: FuncionarioService,
    private loginService: LoginService,
    private router: Router
  ) {}

  ngOnInit() {
    
    console.log(this.funcionarioService.funcionarioSelecionado);
    if (this.funcionarioService.funcionarioSelecionado != undefined){
      this.funcionarioService.CarregarporFuncionarioSelecionado().subscribe( data => {
        this.funcionario = data;
        this.funcionario.id = null;
        this.dataSelecionada = new Date(this.funcionario.dataAniversario);
        console.log(this.funcionario);
      },
      err => { 
        alert('Ocorreu um erro ao carregar Funcionario!');
        console.error(err);                    
       });
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


  Salvar(form: NgForm) {
    this.funcionario.dataAniversario = formatDate(this.funcionario.dataAniversario,"dd/MM/yyyy","en-US");
    this.funcionario.telefoneContato = this.funcionario.telefoneContato.toString().replace("(","").replace(")","").replace("-","");
    this.funcionario.cpf = Number(this.funcionario.cpf.toString().replace(".","").replace(".","").replace("-",""));
    this.funcionario.cepEnderecoPessoal = Number(this.funcionario.cepEnderecoPessoal.toString().replace(".","").replace("-",""));
    this.funcionario.usuarioType = "FUNCIONARIO";
    this.funcionario.usernameAdministrador = this.loginService.username;

    if (this.funcionarioService.funcionarioSelecionado == undefined) {
      console.log(this.funcionario);
      this.funcionarioService.Cadastrar(this.funcionario).subscribe( data =>  {
        alert('Funcionario cadastrado com sucesso!');  
        this.router.navigate(["/home"]);
        }, err => { 
          alert('Ocorreu um erro ao cadastrar funcionario!');
          console.error(err);                    
         }    
       );

    } else {
      console.log(this.funcionario);
      this.funcionarioService.Editar(this.funcionarioService.funcionarioSelecionado.id, this.funcionario).subscribe( data =>  {
        alert('Funcionario alterado com sucesso!');    
        this.router.navigate(["/home"]);
        }, err => { 
          alert('Ocorreu um erro ao alterar Funcionario!');
          console.error(err);                    
         }    
       );

    }
     
  }

}
