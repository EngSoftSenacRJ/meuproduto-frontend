import { LojaService } from "./loja.service";
import { async, ComponentFixture, TestBed, tick } from '@angular/core/testing';
import { MaterialModule } from 'src/app/material-module';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BsModalService, BsModalRef, ModalModule } from 'ngx-bootstrap/modal';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginService } from '../login/login.service';

describe('Service loja',()=>{
    let httpClient: HttpClient;
    let httpTestingController: HttpTestingController;
    let service: LojaService;
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [],
            imports: [BrowserAnimationsModule, MaterialModule, HttpClientTestingModule, RouterTestingModule, ModalModule.forRoot()],
            providers: [BsModalService, BsModalRef,LojaService]
        }).compileComponents();
    }));

    beforeAll(()=>{
        const loginService = new LoginService(httpClient);
        const token = loginService.token;
        service = new LojaService(httpClient,loginService);
    });

    it('Deve ser instanciado',()=>{
        expect(service).toBeTruthy();
    });

    // it('',()=>{
    //     service.listar();
    // })
});