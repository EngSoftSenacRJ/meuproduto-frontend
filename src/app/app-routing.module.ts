import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotFoundComponent } from './errors/not-found/not-found.component';
import { CadastroAdminComponent } from './administrador/cadastro-admin/cadastro-admin.component';
import { HomeComponent } from './home/home/home.component';
import { LoginAdminComponent } from './administrador/login-admin/login-admin.component';
import { PesquisarComponent } from './pesquisa/pesquisar/pesquisar.component';
import { ListaLojasComponent } from './loja/lista-lojas/lista-lojas.component';
import { CadastroLojaComponent } from './loja/cadastro-loja/cadastro-loja.component';
import { ListaMarcaComponent } from './marca/lista-marca/lista-marca.component';
import { CadastroMarcaComponent } from './marca/cadastro-marca/cadastro-marca.component';
import { CadastroFuncionarioComponent } from './funcionario/cadastro-funcionario/cadastro-funcionario.component';
import { ListaFuncionarioComponent } from './funcionario/lista-funcionario/lista-funcionario.component';

const routes: Routes = [
  {path: "", redirectTo: "home", pathMatch: "full"},
  {path: "home", component: HomeComponent,
  children: [
    // { path: '', component:  AComponent },
    { path: 'cadastro', component: CadastroAdminComponent },
    { path: 'pesquisar', component: PesquisarComponent },
    { path: 'lojas', component: ListaLojasComponent },
    { path: 'cadastroloja', component: CadastroLojaComponent},
    { path: 'marcas', component: ListaMarcaComponent },
    { path: 'cadastromarca', component: CadastroMarcaComponent},
    { path: 'cadastrofuncionario', component: CadastroFuncionarioComponent},
    { path: 'funcionarios', component: ListaFuncionarioComponent},
    { path: '', redirectTo: 'home', pathMatch: 'full'}
    ] },
    { path: 'login', component:  LoginAdminComponent },
   { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
