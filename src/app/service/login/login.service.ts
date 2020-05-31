import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Appconstants } from 'src/app/helpers/appconstants';
import { UsuarioLogado } from 'src/app/model/usuarioLogado';


@Injectable({
  providedIn: 'root'
})
export class LoginService {


  IsAuthenticate: boolean;
  usuarioLogado: UsuarioLogado;
  username: string;
  token: String;
  
  // injetando o HttpClient
  constructor(private httpClient: HttpClient) { }

  // Headers
  httpOptionsLogin = {
    headers: new HttpHeaders({
      'Content-Type':  'application/x-www-form-urlencoded'
    }),
  };


  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    }),
  };

  ConstroiHeader(): any {
    return {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Bearer ' + this.token
      }),
    };
  }

  // Fazer Login
  Logar(userName: String, password: String): Observable<UsuarioLogado> {
    console.log(environment.apiBaseHost);
    console.log(environment.apiBaseHost);
    console.log(environment.apiBasePort);
    return this.httpClient.post<UsuarioLogado>(Appconstants.baseAPIURL + 'authenticate', {"username":userName,"password":password},this.httpOptions)
      .pipe(
        retry(0),
        catchError(this.handleError)
      )
  }

    // Buscar dados do usuário logado
    BuscarUsuarioLogado(userName: string): Observable<any> {
      return this.httpClient.get<any>(Appconstants.baseAPIURL + 'administradores/administrador?username=' + userName, this.ConstroiHeader())
        .pipe(
          retry(0),
          catchError(this.handleError)
        )
    }


  Logout() {
    this.IsAuthenticate = false;
    this.token = undefined;
    this.username = undefined;    
  }

  // Manipulação de erros
  handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Erro ocorreu no lado do client
      errorMessage = error.error.message;
    } else {
      // Erro ocorreu no lado do servidor
      
      if (error.status == 401) {
        errorMessage = 'Usuário não encontrado ou senha incorreta.';
      } else {
        errorMessage = 'Ocorreu um erro ao efetuar operação.';
        console.log(`Código do erro: ${error.status}, ` + `menssagem: ${error.message}, `);  
      }
          
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  };

}
