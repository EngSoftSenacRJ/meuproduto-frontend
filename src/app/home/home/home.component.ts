import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
 
  IsAdmin = true;
  IsFuncionario = false;
  IsLogado = true;  
  constructor() { }

  ngOnInit() {
  }

  logout() {
    this.IsLogado = false;
    this.IsFuncionario = false;
    this.IsAdmin = false;  
  }

}
