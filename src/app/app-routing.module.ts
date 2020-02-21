import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotFoundComponent } from './errors/not-found/not-found.component';
import { CadastroAdminComponent } from './administrador/cadastro-admin/cadastro-admin.component';
import { HomeComponent } from './home/home/home.component';
import { EditAdminComponent } from './administrador/edit-admin/edit-admin.component';
import { LoginAdminComponent } from './administrador/login-admin/login-admin.component';
import { PesquisarComponent } from './pesquisa/pesquisar/pesquisar.component';
import { ListaLojasComponent } from './loja/lista-lojas/lista-lojas.component';
import { CadastroLojaComponent } from './loja/cadastro-loja/cadastro-loja.component';

const routes: Routes = [
  {path: "", redirectTo: "home", pathMatch: "full"},
  {path: "home", component: HomeComponent,
  children: [
    // { path: '', component:  AComponent },
    { path: 'login', component:  LoginAdminComponent }, 
    { path: 'cadastro', component: CadastroAdminComponent },
    { path: 'editaradmin', component: EditAdminComponent },
    { path: 'pesquisar', component: PesquisarComponent },
    { path: 'lojas', component: ListaLojasComponent },
    { path: 'cadastroloja', component: CadastroLojaComponent},
    { path: '', redirectTo: 'home', pathMatch: 'full'}
    ] },
   { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
