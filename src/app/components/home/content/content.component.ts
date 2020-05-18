import { Component, OnInit } from '@angular/core';
import { HomeComponent } from '../home/home.component';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {
  IsLogado = false;
  constructor(private home :HomeComponent) { }

  ngOnInit() {
    this.IsLogado = this.home.IsLogado; 
    console.log("está logado?"+this.IsLogado);
  }

}
