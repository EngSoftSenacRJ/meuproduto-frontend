import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Usuarioadministrador } from 'src/app/model/usuarioadministrador';
import { LoginService } from '../login/login.service';

@Injectable({
  providedIn: 'root'
})

export class AdministradorService {

   
  // injetando o HttpClient
  constructor(
    private httpClient: HttpClient,
    private loginService: LoginService ) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json', 
    }),
  };

  ConstroiHeader(): any {

    return {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Bearer ' + this.loginService.token
      }),
    };

  }

  // Chama API de Cadastro do Administrador
  Cadastrar(usuarioAdm: Usuarioadministrador): Observable<any> {

    return this.httpClient.post('http://localhost:8080/register',usuarioAdm,this.httpOptions)
      .pipe(
        retry(0),
        catchError(this.handleError)
      )
  }

  // Chama API de Edição do Administrador
  Editar(usuarioAdm: Usuarioadministrador): Observable<any> {

    return this.httpClient.put<any>('http://localhost:8080/administradores',usuarioAdm, this.ConstroiHeader())
      .pipe(
        retry(0),
        catchError(this.handleError)
      )
  }


  // Carregar Administrador por username
  CarregarporUsernameLogado(): Observable<any> {

    console.log('Token:' + this.loginService.token.valueOf());

    return this.httpClient.get('http://localhost:8080/administradores/administrador?username='+ this.loginService.username, this.ConstroiHeader())
      .pipe(
        retry(0),
        catchError(this.handleError)
      )
  }

  // Chama API de Exclusão do Administrador
  Excluir(usuarioAdm: Usuarioadministrador): Observable<any> {

    return this.httpClient.delete('http://localhost:8080/administradores/' + usuarioAdm.id,this.httpOptions)
      .pipe(
        retry(0),
        catchError(this.handleError)
      )
  }

  // Manipulação de erros
  handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Erro ocorreu no lado do client
      errorMessage = error.error.message;
    } else {
      // Erro ocorreu no lado do servidor
      errorMessage = 'Ocorreu um erro ao efetuar operação.';
      console.log(`Código do erro: ${error.status}, ` + `menssagem: ${error.message}, `);          
    }

    console.log(errorMessage);
    return throwError(errorMessage);
  };



}
