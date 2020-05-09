import { ProdutoPage } from "./pageobject/produto.po";
import { ComponentInterface } from './pageobject/common.po';
import { by, element, browser, protractor } from 'protractor';

var origFn = browser.driver.controlFlow().execute;
browser.driver.controlFlow().execute = function() {
   var args = arguments;
 
   // queue 100ms wait
   origFn.call(browser.driver.controlFlow(), function() {
     return protractor.promise.delayed(100);
   });
 
   return origFn.apply(browser.driver.controlFlow(), args);
 };

describe('Testando Módulo Produto:',()=>{
    let prodPage : ProdutoPage;
    let elemento : ComponentInterface;

    beforeEach(()=>{
        prodPage = new ProdutoPage();
        elemento = new ComponentInterface();
    });

    it('Deve navegar até o menu de produtos',()=>{
        prodPage.goToMenuProduto();
        expect(elemento.verificarUrl()).toBe('http://localhost:4200/home/incluirproduto');
    });

    it('Cadastrar produto com sucesso',()=>{
        elemento.pressionarBotao('add');
        expect(elemento.verificarUrl()).toBe('http://localhost:4200/home/cadastroproduto');
        elemento.inputDadosByAtributoName('nome','Galaxy S25');
        elemento.inputDadosByAtributoName('descricao','Produto gerado by teste automatizado');
        elemento.inputDadosByAtributoName('mesesGarantia','12');
        element(by.id('categoria')).all(by.tagName('option')).get(1).click();
        element(by.id('marca')).all(by.tagName('option')).get(0).click();
        elemento.pressionarBotao('Confirmar');
        expect(element(by.className('alert-success')).isPresent()).toBe(true);
        browser.sleep(3000);
        browser.actions().click().perform();
    });

    it('Associar produto->loja com sucesso',()=>{
        element(by.id('lojas')).click();
        element(by.cssContainingText('mat-option .mat-option-text', 'Celulares Imports')).click();

        element(by.id('produtos')).click();
        element(by.cssContainingText('mat-option .mat-option-text', 'Galaxy S25')).click();

        elemento.inputDadosByAtributoName('preco','150,99');
        elemento.pressionarBotao('Incluir');

        expect(element(by.className('alert-success')).isPresent()).toBe(true);
        browser.actions().click().perform();
        browser.sleep(3000);
    });

    it('Editar preço produto loja',()=>{
        element(by.id('lojas')).click();
        element(by.cssContainingText('mat-option .mat-option-text', 'Celulares Imports')).click();

        prodPage.editarPrecoProdSelecionada(1);
        prodPage.inputDadosByFormControl('precoNovo','9789,58');
        elemento.pressionarBotao('Confirmar');

        expect(element(by.className('alert-success')).isPresent()).toBe(true);
        browser.actions().click().perform();
        browser.sleep(3000);
    });

    it('Remover Associação a loja',()=>{
        element(by.id('lojas')).click();
        element(by.cssContainingText('mat-option .mat-option-text', 'Celulares Imports')).click();

        prodPage.excluirAssociaLojaSelecionada(0);
        elemento.pressionarBotao('Sim');
        expect(element(by.className('alert-success')).isPresent()).toBe(true);
    });

});