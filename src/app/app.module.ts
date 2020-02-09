import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MaterialModule} from './material-module';
import { ErrorsModule } from './errors/errors.module';
import { AdministradorModule } from './administrador/administrador.module';
import { HomeComponent } from './home/home/home.component';
import { HomeModule } from './home/home.module';
import { PesquisarComponent } from './pesquisa/pesquisar/pesquisar.component';


@NgModule({
  declarations: [
    AppComponent,
    PesquisarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    ErrorsModule,
    AdministradorModule,
    HomeModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
