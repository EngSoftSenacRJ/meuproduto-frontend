import { Component, OnInit } from '@angular/core';
import { HomeComponent } from '../home/home.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {
  IsLogado = false;

  constructor( private router: Router,
    private home :HomeComponent) { }

  ngOnInit() {
    this.IsLogado = this.home.IsLogado; 
    console.log("está logado?"+this.IsLogado);
  }

  redirecionar(){
  // this.pesquisa.pesquisando = false;    
    this.router.navigate(["home/pesquisar"]);
  }

}
