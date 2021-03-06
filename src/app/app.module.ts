/* HTTP  */
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TextMaskModule } from 'angular2-text-mask';
import { ModalModule, BsModalService, BsModalRef } from 'ngx-bootstrap';
import { AdministradorModule } from './components/administrador/administrador.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ErrorsModule } from './errors/errors.module';
import { CadastroFuncionarioComponent } from './components/funcionario/cadastro-funcionario/cadastro-funcionario.component';
import { ListaFuncionarioComponent } from './components/funcionario/lista-funcionario/lista-funcionario.component';
import { HomeModule } from './components/home/home.module';
import { LojaModule } from './components//loja/loja.module';
import { CadastroMarcaComponent } from './components/marca/cadastro-marca/cadastro-marca.component';
import { ListaMarcaComponent } from './components/marca/lista-marca/lista-marca.component';
import { MaterialModule } from './material-module';
import { PesquisarComponent, DetalhelojaComponent,DetalheProdutoComponent } from './components/pesquisa/pesquisar/pesquisar.component';
import { SharedModule } from './shared/shared.module';
import { CadastroProdutoComponent } from './components/produto/cadastro-produto/cadastro-produto.component';
import { AssociaLojaprodutoComponent } from './components/loja/associa-lojaproduto/associa-lojaproduto.component';
import { LogprodutoComponent } from './components/visibilidade/logproduto/logproduto.component';
import {ContentComponent} from './components/home/content/content.component';


@NgModule({
  declarations: [
    AppComponent,
    PesquisarComponent,
    DetalhelojaComponent,
    DetalheProdutoComponent,
    CadastroFuncionarioComponent,
    ListaMarcaComponent,
    CadastroMarcaComponent,
    ListaFuncionarioComponent,
    CadastroProdutoComponent,
    AssociaLojaprodutoComponent,
    LogprodutoComponent,
    ContentComponent,
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
    ReactiveFormsModule,
    ModalModule.forRoot()   
  ],
  entryComponents: [
    DetalhelojaComponent,
    DetalheProdutoComponent,
  ],
  providers: [HttpClientModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
