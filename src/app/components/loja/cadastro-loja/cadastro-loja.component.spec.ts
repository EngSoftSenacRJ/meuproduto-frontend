import { async, ComponentFixture, TestBed, tick } from '@angular/core/testing';
import { MaterialModule } from 'src/app/material-module';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BsModalService, BsModalRef, ModalModule } from 'ngx-bootstrap/modal';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CadastroLojaComponent } from './cadastro-loja.component';
import { TextMaskModule } from 'angular2-text-mask';
import { NgForm, FormGroup } from '@angular/forms';
import { LojaService } from 'src/app/service/loja/loja.service';
import { ListaFuncionarioComponent } from '../../funcionario/lista-funcionario/lista-funcionario.component';
import { Loja } from 'src/app/model/loja';

describe('Teste de HTML', ()=>{
    let component: CadastroLojaComponent;
    let fixture: ComponentFixture<CadastroLojaComponent>;
    let httpClient: HttpClient;
    let httpTestingController: HttpTestingController;
    let service: LojaService;
    let loja:Loja;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [CadastroLojaComponent],
            imports: [TextMaskModule,BrowserAnimationsModule, MaterialModule, HttpClientTestingModule, RouterTestingModule, ModalModule.forRoot()],
            providers: [BsModalService, BsModalRef, LojaService],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(CadastroLojaComponent);
        component = fixture.componentInstance;
    });

    it('O formulário deve conter um título',()=>{
        fixture.detectChanges();
        let de = fixture.debugElement.query(By.css('.card-admin-title')).nativeElement;
        expect(de.innerText).toContain('Cadastrar Loja');     
    });

    it('O formulário deve conter campo loja',()=>{
        fixture.detectChanges();
        let de = fixture.debugElement.query(By.css('#lojaName'));
        expect(de).toBeTruthy();
    });

    // it('Formulario elemento',()=>{
    //     const testForm = <NgForm>{
    //         value: {
    //             nome: "Hello",
    //             cnpj: "1132132"
    //         }
    //     };

    //     loja.id = 1;
    //     service.lojaSelecionada = loja;
    //     expect(component.salvar(testForm)).toBeUndefined();
    // });

    it('Função de retornar',()=>{
        const testForm = <NgForm>{
            value: {
                nome: "Hello",
                cnpj: "1132132"
            }
        }

        fixture.detectChanges();
        expect(component.retornar(testForm)).toHaveBeenCalled();
    });

    


});