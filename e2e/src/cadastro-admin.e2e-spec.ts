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

describe('Testando Cadastro Administrador:', () => {
    let cadastroAdminPage: CadastroAdminPage;


    let informacoesCadastro = [
        { nome: 'nome', valor: 'Carmen' },
        { nome: 'cpf', valor: 58376160710},
        { nome: 'telefone_contato', valor: '21999642637' },
        { nome: 'dataAniversario', valor: '10/04/1995' },
        { nome: 'ruaEnderecoPessoal', valor: 'Rua A' },
        { nome: 'numeroEnderecoPessoal', valor: 15 },
        { nome: 'cepEnderecoPessoal', valor: 21520460 },
        { nome: 'bairroEnderecoPessoal', valor: 'Pavuna' },
        { nome: 'cidadeEnderecoPessoal', valor: 'Janeiro' },
        { nome: 'estadoEnderecoPessoal', valor: 'Rio de Janeiro' },
        { nome: 'username', valor: 'carmenlivia@gmail.com' },
        { nome: 'password', valor: '123456' }
    ]

    beforeEach(() => {
        cadastroAdminPage = new CadastroAdminPage();
    });

    it('Deve ir para página de cadastro', () => {
        cadastroAdminPage.goToCadastro();
        expect(cadastroAdminPage.verificarUrl()).toBe('http://localhost:4200/home/cadastro');
    });

    it('Deve reliazar um cadastro com sucesso', () => {
        informacoesCadastro.forEach(usuario => {
            cadastroAdminPage.registrarDadosAdmin(usuario.nome, usuario.valor);
        })
        cadastroAdminPage.confirmaCadastro().click();
        expect(element(by.className('alert-success')).isPresent()).toBe(true);
        browser.actions().click().perform();
        browser.sleep(3000);
    });

});