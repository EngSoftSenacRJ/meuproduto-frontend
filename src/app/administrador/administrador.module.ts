import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CadastroAdminComponent } from './cadastro-admin/cadastro-admin.component';
import {MaterialModule} from '../material-module';
import { RouterModule } from '@angular/router';
import { EditAdminComponent } from './edit-admin/edit-admin.component';
import { LoginAdminComponent } from './login-admin/login-admin.component';



@NgModule({
  declarations: [CadastroAdminComponent, EditAdminComponent, LoginAdminComponent],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule
  ]
})
export class AdministradorModule { }
