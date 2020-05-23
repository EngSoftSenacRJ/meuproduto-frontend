import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ListaLojasComponent } from './lista-lojas.component';
import { MaterialModule } from 'src/app/material-module';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BsModalService, BsModalRef, ModalModule } from 'ngx-bootstrap/modal';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';

describe('Verificar conteúdo HTML exibido em Lista Lojas', () => {
    let component: ListaLojasComponent;
    let fixture: ComponentFixture<ListaLojasComponent>;
    let httpClient: HttpClient;
    let httpTestingController: HttpTestingController;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ListaLojasComponent],
            imports: [MaterialModule,HttpClientTestingModule,RouterTestingModule,ModalModule.forRoot()],
            providers:[BsModalService,BsModalRef]
        }).compileComponents();
    }));

    beforeEach(()=>{
        fixture = TestBed.createComponent(ListaLojasComponent);
        component = fixture.componentInstance;
    });
    
    it('Deve criar', () => {
        // fixture = TestBed.createComponent(ListaLojasComponent);
        // component = fixture.componentInstance;
        expect(component).toBeDefined();
    });

    it('Deve ter um título na tabela', ()=>{
        fixture.detectChanges();
        let de = fixture.debugElement.query(By.css('.titulo')).nativeElement;
        expect(de.innerText).toContain('Lojas cadastradas');
    });


})