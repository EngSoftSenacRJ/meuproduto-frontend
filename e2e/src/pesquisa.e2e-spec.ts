import { ComponentInterface } from "./pageobject/common.po";
import { element, by, browser } from 'protractor';
import { protractor } from 'protractor/built/ptor';
import { PesquisaPage } from './pageobject/pesquisa.po';

var origFn = browser.driver.controlFlow().execute;
browser.driver.controlFlow().execute = function() {
   var args = arguments;
 
   // queue 100ms wait
   origFn.call(browser.driver.controlFlow(), function() {
     return protractor.promise.delayed(100);
   });
 
   return origFn.apply(browser.driver.controlFlow(), args);
 };
 
describe('Testando módulo de pesquisa: ',()=>{
    let elemento : ComponentInterface;
    let pesqPage : PesquisaPage;

    beforeEach(()=>{
        elemento = new ComponentInterface();
        pesqPage = new PesquisaPage();
    });

    it('Dever ir para a página de pesquisa:',()=>{
        elemento.pressionarBotao('Pesquisar');
        expect(elemento.verificarUrl()).toBe('http://localhost:4200/home/pesquisar');
    });

    it('Deve pesquisar pelo primeiro indice dos selects',()=>{
        element(by.id('categoria')).all(by.tagName('option')).get(0).click();
        element(by.id('marca')).all(by.tagName('option')).get(0).click();
        element(by.id('Distancia')).all(by.tagName('option')).get(0).click();
        element(by.cssContainingText('.btn-block', 'Pesquisar')).click();        
      
        // browser.actions().click().perform();
    });

    it('Deve abrir os detallhes do produto buscado', ()=>{
       expect(element.all(by.repeater("pesquisa-list")).get(0).element(by.id('produto')).click()).toBeDefined();
        browser.sleep(3000);
        browser.actions().click().perform();

    });

    it('Deve abrir os detalhes da loja do produto buscado', ()=>{
        expect(element.all(by.repeater("pesquisa-list")).get(0).element(by.id('loja')).click()).toBeDefined();
        browser.sleep(3000);

    })
});