import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Appconstants } from 'src/app/helpers/appconstants';
import { Loja } from 'src/app/model/loja';
import { tap, retry, catchError, map } from 'rxjs/operators';
import { throwError, Observable } from 'rxjs';
import { tokenName } from '@angular/compiler';
import { LoginService } from '../login/login.service';

@Injectable({
  providedIn: 'root'
})
export class LojaService {

  constructor(private http: HttpClient,
    private loginService: LoginService) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization' : 'Bearer ' + tokenName
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

  cadastrar(loja : Loja): Observable<any> {
    
    console.log("retorno loja: "+loja.nome);
    console.log("Token: "+this.loginService.token);
    return this.http.post(Appconstants.baseAPIURL+'lojas', loja, this.ConstroiHeader())
    .pipe(
      retry(0),
      catchError(this.handleError)
    )
  }

  listar(): Observable<Loja[]>{
    return this.http.get<Loja[]>(Appconstants.baseAPIURL + 'lojas',this.ConstroiHeader())
    .pipe(
      map(data => data['_embedded']['lojaResources'])   
    );
  }

  // Manipulação de erros
  handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Erro ocorreu no lado do client
      errorMessage = error.error.message;
      console.log("Erro lado cliente: "+errorMessage);
    } else {
      // Erro ocorreu no lado do servidor
      errorMessage = 'Ocorreu um erro ao efetuar operação.';
      console.log(`Código do erro: ${error.status}, ` + `menssagem: ${error.message}, `);          
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  };
}
