import { Component, OnInit, Inject } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CategoriaService } from 'src/app/service/categoria/categoria.service';
import { MarcaService } from 'src/app/service/marca/marca.service';
import { Marca } from 'src/app/model/marca';
import { Categoria } from 'src/app/model/categoria';
import { Search } from 'src/app/model/search';
import { SearchService } from 'src/app/service/search/search.service';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { SearchResult } from 'src/app/model/searchresult';

@Component({
  selector: 'app-pesquisar',
  templateUrl: './pesquisar.component.html',
  styleUrls: ['./pesquisar.component.css']
})
export class PesquisarComponent implements OnInit {

  pesqPorLoc: false;
  marcas : Marca[];
  categorias : Categoria[];
  search = {} as Search;
  lat: number;
  long: number;
  resultado: any;
  pesquisando: boolean = true;

  key: string = 'produto'; // Define um valor padrão, para quando inicializar o componente
    reverse: boolean = false;
    sort(key) {
        this.key = key;
        this.reverse = !this.reverse;
    }
  
  constructor(
    private categoriaService: CategoriaService,
    private marcaService: MarcaService,
    private searchService: SearchService,
    public matDialog: MatDialog
  ) { }

  ngOnInit() {
    this.marcaService.listarPublica().subscribe( data => {
      this.marcas = data;
    },
    err => { 
      alert('Ocorreu um erro ao carregar marcas!');
      console.error(err);                    
     });

    this.categoriaService.listarPublica().subscribe( data => {
      this.categorias = data;
    },
    err => { 
      alert('Ocorreu um erro ao carregar categorias!');
      console.error(err);                    
     });

      if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition((position)=>{
            this.long = position.coords.longitude;
            this.lat = position.coords.latitude;
          });
      } else {
         console.log("No support for geolocation");
      }
    }

  pesquisar(form: NgForm) {

    if (this.search.distanceKM == undefined || this.search.distanceKM ==0) {
      this.search.distanceKM = undefined;
    } else {
      this.search.latitude = this.lat;
      this.search.longitude = this.long;
    }

    this.searchService.Listar(this.search).subscribe(
      dados => this.resultado = dados
    );  

    this.pesquisando=false;
  }

  Voltar() {
    this.pesquisando=true;
  }

  DetalheLoja(loja: SearchResult) {
    this.matDialog.open(DetalhelojaComponent, {
      data: loja
    });
  }

  DetalheProduto(produto: SearchResult) {
    this.matDialog.open(DetalheProdutoComponent, {
      data: produto
    });
  }

}

@Component({
  selector: 'detalheloja',
  templateUrl: 'detalheloja.html',
  styleUrls: ['./detalheloja.css']
})

export class DetalhelojaComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: SearchResult) {}

  FormatarTel(tel: string): string {
    return "(" + tel.substring(0,2) + ")" + tel.substring(2,6) + "-" + tel.substring(6,10) 
  }

  FormatarCEP(cep: string): string {
    return cep.substring(0,5) + "-" + cep.substring(5,10) 
  }
}

@Component({
  selector: 'detalheproduto',
  templateUrl: 'detalheproduto.html',
  styleUrls: ['./detalheloja.css']
})

export class DetalheProdutoComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: SearchResult) {}
}

