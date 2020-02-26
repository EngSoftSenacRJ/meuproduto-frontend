import { Component, OnInit, ViewChild } from '@angular/core';
import { Loja } from 'src/app/model/loja';
import { LojaService } from 'src/app/service/loja/loja.service';

@Component({
  selector: 'app-lista-lojas',
  templateUrl: './lista-lojas.component.html',
  styleUrls: ['./lista-lojas.component.css']
})
export class ListaLojasComponent implements OnInit {

  lojas : Loja[];
  constructor(private service : LojaService){}

  ngOnInit() {
    this.service.listar().subscribe(dados => this.lojas = dados);
  }
}