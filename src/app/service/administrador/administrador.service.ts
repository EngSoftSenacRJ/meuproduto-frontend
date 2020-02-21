import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Usuarioadministrador } from 'src/app/model/usuarioadministrador';

@Injectable({
  providedIn: 'root'
})
export class AdministradorService {

   
  // injetando o HttpClient
  constructor(private httpClient: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json', 
    }),
  };

  // Chama API de Cadastro do Administrador
  Cadastrar(usuarioAdm: Usuarioadministrador): Observable<any> {

    return this.httpClient.post('http://localhost:8080/administradores',usuarioAdm,this.httpOptions)
      .pipe(
        retry(0),
        catchError(this.handleError)
      )
  }

  // Chama API de Edição do Administrador
  Editar(usuarioAdm: Usuarioadministrador): Observable<Usuarioadministrador> {

    return this.httpClient.put<Usuarioadministrador>('http://localhost:8080/administradores',usuarioAdm,this.httpOptions)
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
