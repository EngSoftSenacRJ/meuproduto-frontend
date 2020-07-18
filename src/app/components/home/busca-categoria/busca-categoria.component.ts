import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SearchService } from 'src/app/service/search/search.service';

@Component({
  selector: 'app-busca-categoria',
  templateUrl: './busca-categoria.component.html',
  styleUrls: ['./busca-categoria.component.css']
})
export class BuscaCategoriaComponent implements OnInit {
  categoria: string;
  resultado: any;

  constructor(private router: Router,
    private route: ActivatedRoute,  private searchService: SearchService) { }

  ngOnInit() {
    this.route.queryParams.subscribe(
      (queryParams: any) => {
        this.categoria = queryParams['cat'];
        console.log('Query pegou: '+this.categoria);
      }
    );
    
    this.searchService.ListarByCategoria(8).subscribe(
      dados =>{ this.resultado = dados;
        console.log("Retorno: "+this.resultado);
      }
      );

  }

  Voltar() {
    this.router.navigate(['home']);
  }

}
