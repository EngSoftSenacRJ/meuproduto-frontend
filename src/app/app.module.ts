import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MaterialModule} from './material-module';
import { ErrorsModule } from './errors/errors.module';
import { AdministradorModule } from './administrador/administrador.module';
import { HomeModule } from './home/home.module';
import { PesquisarComponent } from './pesquisa/pesquisar/pesquisar.component';
import { TextMaskModule } from 'angular2-text-mask';
import { ModalModule } from 'ngx-bootstrap';

/* HTTP  */
import { HttpClientModule } from '@angular/common/http';
import { LojaModule } from './loja/loja.module';
import { FormsModule } from '@angular/forms';
import { SharedModule } from './shared/shared.module';
import { CadastroFuncionarioComponent } from './funcionario/cadastro-funcionario/cadastro-funcionario.component';
import { ListaMarcaComponent } from './marca/lista-marca/lista-marca.component';
import { CadastroMarcaComponent } from './marca/cadastro-marca/cadastro-marca.component';
import { ListaFuncionarioComponent } from './funcionario/lista-funcionario/lista-funcionario.component';
@NgModule({
  declarations: [
    AppComponent,
    PesquisarComponent,
    CadastroFuncionarioComponent,
    ListaMarcaComponent,
    CadastroMarcaComponent,
    ListaFuncionarioComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    ErrorsModule,
    AdministradorModule,
    HomeModule,
    TextMaskModule,
    HttpClientModule,
    LojaModule,
    FormsModule,
    SharedModule,
    ModalModule.forRoot()   
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
