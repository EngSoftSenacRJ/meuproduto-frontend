import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
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
  usuarioLogado: number;
  dataSelecionada;

  CPFmask = [/\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '-', /\d/, /\d/];
  Telmask = ['(', /\d/, /\d/, ')', /\d/, /\d/, /\d/,/\d/,/\d/, '-',/\d/, /\d/, /\d/, /\d/,];
  CEPmask = [/\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/];

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

        this.usuarioAdm = data;
        this.usuarioLogado = this.usuarioAdm.id;
        this.usuarioAdm.id = null;
        
        let dateArray = this.usuarioAdm.dataAniversario.split("/");
        this.dataSelecionada = new Date(dateArray[2] + "-" + dateArray[1] + "-" + dateArray[0])
        //console.log(this.usuarioAdm.dataAniversario);

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


  Salvar(form: NgForm) {
    this.usuarioAdm.dataAniversario = formatDate(this.usuarioAdm.dataAniversario,"dd/MM/yyyy","en-US");
    this.usuarioAdm.telefoneContato = this.usuarioAdm.telefoneContato.toString().replace("(","").replace(")","").replace("-","");
    this.usuarioAdm.cpf = Number(this.usuarioAdm.cpf.toString().replace(".","").replace(".","").replace("-",""));
    this.usuarioAdm.cepEnderecoPessoal = Number(this.usuarioAdm.cepEnderecoPessoal.toString().replace(".","").replace("-",""));
    this.usuarioAdm.usuarioType = "ADMINISTRADOR";
    console.log(this.usuarioAdm);

    if (!this.loginService.IsAuthenticate) {

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
      this.administradorService.Editar(this.usuarioLogado, this.usuarioAdm).subscribe( data =>  {
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
