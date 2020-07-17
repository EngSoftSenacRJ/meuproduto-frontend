import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Appconstants } from 'src/app/helpers/appconstants';
import { retry, catchError, map, take } from 'rxjs/operators';
import { throwError, Observable } from 'rxjs';
import { LoginService } from '../login/login.service';
import { Search } from 'src/app/model/search';
import { SearchResult } from 'src/app/model/searchresult';


@Injectable({
  providedIn: 'root'
})
export class SearchService {

  resultado: SearchResult[];

  constructor(private http: HttpClient,
    private loginService: LoginService) { }

    httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
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

    Listar(search : Search): Observable<any> {

       let params = ""
       
       if (search.idCategoria != null && search.idCategoria > 0) {
        params ='&idCategoria=' + search.idCategoria;
       }
     
      if (search.idMarca != null && search.idMarca > 0) {
         params +='&idMarca='+ search.idMarca;
      }
      
       if (search.nomeProduto != null) {
         params +='&nomeProduto=' + search.nomeProduto;
      }
    
      if (search.latitude != undefined && search.longitude != undefined && search.distanceKM != undefined && search.distanceKM > 0) {
        params+='&latitude=' + search.latitude;
        params+='&longitude=' + search.longitude;
        params+='&distanceKM=' + search.distanceKM;
      }
      console.log(Appconstants.baseSearchAPIURL+'?' + params)
      return this.http.get(Appconstants.baseSearchAPIURL+'search?'+ params, this.httpOptions )
      //return this.http.post(Appconstants.baseAPIURL+'search', JSON.parse(JSON.stringify(search)), this.ConstroiHeader() )
      .pipe(
      map(data => data['_embedded']['produtoSearchResponseResources']),
      catchError(this.handleError)
      )
    }

    ListarByCategoria(cat:String): Observable<any> {

      let params = ""
     
      if (cat != null) {
        params +='&nomeProduto=' + cat;
     }
   
     console.log(Appconstants.baseAPIURL+'search' + params)
     return this.http.get(Appconstants.baseAPIURL+'search?' + params, this.httpOptions )
     //return this.http.post(Appconstants.baseAPIURL+'search', JSON.parse(JSON.stringify(search)), this.ConstroiHeader() )
     .pipe(
     map(data => data['_embedded']['produtoSearchResponseResources']),
     catchError(this.handleError)
     )
   }


     // Manipulação de erros
  handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Erro ocorreu no lado do client
      errorMessage = error.error.message;
      console.log("Erro lado cliente: "+ errorMessage);
    } else {
      // Erro ocorreu no lado do servidor
      errorMessage = `Ocorreu um erro ao efetuar operação. \n ${error.error.message} `;
      console.log(`Código do erro: ${error.status}, ` + `menssagem: ${error.message}, `);          
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  };


}
