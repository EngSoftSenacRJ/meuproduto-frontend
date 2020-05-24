import { async, ComponentFixture, TestBed, tick } from '@angular/core/testing';
import { ListaLojasComponent } from './lista-lojas.component';
import { MaterialModule } from 'src/app/material-module';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BsModalService, BsModalRef, ModalModule } from 'ngx-bootstrap/modal';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


describe('Verificar conteúdo HTML exibido em Lista Lojas', () => {
    let component: ListaLojasComponent;
    let fixture: ComponentFixture<ListaLojasComponent>;
    let httpClient: HttpClient;
    let httpTestingController: HttpTestingController;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ListaLojasComponent],
            imports: [BrowserAnimationsModule, MaterialModule, HttpClientTestingModule, RouterTestingModule, ModalModule.forRoot()],
            providers: [BsModalService, BsModalRef]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ListaLojasComponent);
        component = fixture.componentInstance;
    });

    it('Deve criar', () => {
        expect(component).toBeDefined();
    });

    it('Deve ter um título na tabela', () => {
        fixture.detectChanges();
        let de = fixture.debugElement.query(By.css('.titulo')).nativeElement;
        expect(de.innerText).toContain('Lojas cadastradas');
    });

    it('Deve ter na table a coluna ´Nome da Loja´', () => {
        fixture.detectChanges();
        let de = fixture.debugElement.query(By.css('#nomeLoja')).nativeElement;
        expect(de.innerText).toContain('Nome da Loja');
    });

    it('Deve ter na table a coluna Endereco', () => {
        fixture.detectChanges();
        let de = fixture.debugElement.query(By.css('#endereco')).nativeElement;
        expect(de.innerText).toContain('Endereço');
    });

    it('Deve ter na table a coluna Telefone Contato', () => {
        fixture.detectChanges();
        let de = fixture.debugElement.query(By.css('#telefone')).nativeElement;
        expect(de.innerText).toContain('Telefone Contato');
    });

    it('Deve ter na table a coluna Ações', () => {
        fixture.detectChanges();
        let de = fixture.debugElement.query(By.css('#acoes')).nativeElement;
        expect(de.innerText).toContain('Ações');
    });

    it('Utilizar a função sort', async(() => {
        fixture.detectChanges();
        const retorno = component.reverse = false;
        component.sort('nome');
        expect(component.reverse).toBeTruthy();
    }));

    // it('Deve ter uma classe btn-info',()=>{
    //     fixture.detectChanges();
    //     let el = fixture.debugElement.query(By.css('.table .table-bordered .table-hover'));
    //     expect(el).toBeTruthy();
    // });

    it('Função de confirmar modal',()=>{
        fixture.detectChanges();
        expect(component.confirm()).toBeUndefined();
    });

    it('Função de declinar modal',()=>{
        fixture.detectChanges();
        expect(component.decline()).toBeUndefined();
    });

})