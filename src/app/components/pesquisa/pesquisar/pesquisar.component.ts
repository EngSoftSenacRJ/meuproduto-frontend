import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CategoriaService } from 'src/app/service/categoria/categoria.service';
import { MarcaService } from 'src/app/service/marca/marca.service';
import { Marca } from 'src/app/model/marca';
import { Categoria } from 'src/app/model/categoria';
import { Search } from 'src/app/model/search';
import { SearchService } from 'src/app/service/search/search.service';
import { Router } from '@angular/router';
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

}
