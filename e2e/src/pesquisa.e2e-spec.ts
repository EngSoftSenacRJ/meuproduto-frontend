import { ComponentInterface } from "./pageobject/common.po";
import { element, by, browser } from 'protractor';
import { protractor } from 'protractor/built/ptor';

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

    beforeEach(()=>{
        elemento = new ComponentInterface();
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
        browser.sleep(3000);
        // browser.actions().click().perform();
    });
});