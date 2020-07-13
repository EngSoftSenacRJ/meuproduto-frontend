import { LoginAdminPage } from './pageobject/login-admin.po';
import { CadastroAdminPage } from './pageobject/cadastro-admin-po';
import { browser, protractor, element, by } from 'protractor';
import { ComponentInterface } from './pageobject/common.po';

// var origFn = browser.driver.controlFlow().execute;

// browser.driver.controlFlow().execute = function () {
//     var args = arguments;

//     // queue 100ms wait
//     origFn.call(browser.driver.controlFlow(), function () {
//         return protractor.promise.delayed(100);
//     });

//     return origFn.apply(browser.driver.controlFlow(), args);
// };

describe('Testando tela de Login:', () => {
    let loginAdminPage: LoginAdminPage;
    let elemento : ComponentInterface;


    beforeEach(() => {
        loginAdminPage = new LoginAdminPage();
        elemento = new ComponentInterface();
    });

    it('Deve ir para a pagina de login', () => {
        loginAdminPage.acessarLoginAdmin();
        expect(loginAdminPage.verificarUrl()).toBe('/login');

    });

    it('Deve dar erro ao realizar o login', () => {
        expect(loginAdminPage.pegarInput('username', ''));
        expect(loginAdminPage.pegarInput('password', ''));
        expect(loginAdminPage.pegarBotaoLogin().click());
        expect(loginAdminPage.verificarUrl()).toBe('http://localhost:4200/login');
    });

    it('Deve fazer login com sucesso', () => {
        expect(loginAdminPage.pegarInput('username', 'carmenlivia.lopes@gmail.com'));
        expect(loginAdminPage.pegarInput('password', '12345'));
        expect(loginAdminPage.pegarBotaoLogin().click());
        expect(loginAdminPage.verificarUrl()).toBe('http://localhost:4200/home');

    });

    it('Deve editar dado do administrador com sucesso',()=>{
        elemento.pressionarBotao('Gerencia Adm.');
        elemento.pressionarBotao('Gerenciar dados');
        elemento.pressionarBotao('Editar dados pessoais');

        elemento.limparCampoInput('nome');
        elemento.inputDadosByAtributoName('nome','Carmen');
        elemento.inputDadosByAtributoName('password','12345');
        elemento.pressionarBotao('Concluir');
        expect(element(by.className('alert-success')).isPresent()).toBe(true);
        browser.actions().click().perform();
        browser.sleep(3000);
    });
});