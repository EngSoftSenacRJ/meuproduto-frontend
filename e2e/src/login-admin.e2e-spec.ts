import {LoginAdminPage} from './pageobject/login-admin.po';
import { CadastroAdminPage } from './pageobject/cadastro-admin-po';
import { browser, protractor } from 'protractor';

var origFn = browser.driver.controlFlow().execute;

browser.driver.controlFlow().execute = function() {
  var args = arguments;

  // queue 100ms wait
  origFn.call(browser.driver.controlFlow(), function() {
    return protractor.promise.delayed(100);
  });

  return origFn.apply(browser.driver.controlFlow(), args);
};

describe('Testando Cadastro Administrador:',()=>{
    let cadastroAdminPage : CadastroAdminPage;

    let informacoesCadastro=[
        {nome: 'nome', valor:'Carmen'},
        {nome: 'cpf', valor:14913117700},
        {nome: 'telefone_contato', valor:'21999642637'},
        {nome: 'dataAniversario', valor:'10/04/1995'},
        {nome: 'ruaEnderecoPessoal', valor:'Rua A'},
        {nome: 'numeroEnderecoPessoal', valor:15},
        {nome: 'cepEnderecoPessoal', valor:21520460},
        {nome: 'bairroEnderecoPessoal', valor: 'Pavuna'},
        {nome: 'cidadeEnderecoPessoal', valor:'Janeiro'},
        {nome: 'estadoEnderecoPessoal', valor:'Rio de Janeiro'},
        {nome: 'username', valor:'carmenlivia@outlook.com'},
        {nome: 'password', valor:'123456'}
      ]

    beforeEach(()=>{
        cadastroAdminPage = new CadastroAdminPage();
    });

    it('Deve ir para página de cadastro',()=>{
        expect(
            cadastroAdminPage.goToCadastro()
        )
    });

    it('Deve reliazar um cadastro com sucesso', () => {
        informacoesCadastro.forEach(usuario => {
            cadastroAdminPage.registrarDadosAdmin(usuario.nome, usuario.valor);
        })
        expect(cadastroAdminPage.confirmaCadastro().click());
    });

});


describe('Testando tela de Login:',()=>{
    let loginAdminPage: LoginAdminPage; 
    
    beforeEach(()=> {
        loginAdminPage = new LoginAdminPage();
    });

    it('Deve ir para a pagina de login',() =>{
        loginAdminPage.acessarLoginAdmin();
    });

    it('Deve verificar a url',()=>{
        expect(loginAdminPage.verificarUrl()).toBe('http://localhost:4200/login');
    });

    it('Deve dar erro ao realizar o login',()=>{
        expect(loginAdminPage.pegarInput('username',''));
        expect(loginAdminPage.pegarInput('password',''));
        expect(loginAdminPage.pegarBotaoLogin().click());
        expect(loginAdminPage.verificarUrl()).toBe('http://localhost:4200/login');
    });

    it('Deve fazer login com sucesso',() =>{
        expect(loginAdminPage.pegarInput('username','carmenlivia.lopes@gmail.com'));
        expect(loginAdminPage.pegarInput('password','1234'));
        expect(loginAdminPage.pegarBotaoLogin().click());
        expect(loginAdminPage.verificarUrl()).toBe('http://localhost:4200/home');

    });

});

