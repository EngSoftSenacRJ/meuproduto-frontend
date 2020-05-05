import {LojaPage} from './pageobject/loja.po';
import { browser, element, by, protractor } from 'protractor';

// var origFn = browser.driver.controlFlow().execute;
// browser.driver.controlFlow().execute = function() {
//    var args = arguments;
 
//    // queue 100ms wait
//    origFn.call(browser.driver.controlFlow(), function() {
//      return protractor.promise.delayed(100);
//    });
 
//    return origFn.apply(browser.driver.controlFlow(), args);
//  };
describe('Testando CRUD de Loja',() =>{
   let lojaPage : LojaPage;
   
   let informacoesLoja=[
      {nome:'nome', valor:'Loja InfoTech'},
      {nome:'razaoSocial', valor:'Eletrônicos S/A'},
      {nome:'cnpj', valor:'12895555165622'},
      {nome:'telefone', valor:'219996-4263'},
      {nome: 'cep', valor:'21520460'},
      {nome:'rua', valor:'Rua ABC'},
      {nome:'numero', valor:'15'}
   ]

   beforeEach(()=>{
      lojaPage = new LojaPage();
   })

   it('Deve ir para o menu de lojas',() =>{
         lojaPage.goToMenuLoja();
         expect(lojaPage.verificarUrl()).toBe('http://localhost:4200/home/lojas');
   });

   it('Deve cadastrar Loja', () => {
      lojaPage.goToCadastroLoja();
      informacoesLoja.forEach(loja =>{
         lojaPage.inputDadosByAtributoName(loja.nome, loja.valor);
      });
      lojaPage.pressionarBotao('Confirmar');
      expect(element(by.className('alert-success')).isPresent()).toBe(true);
      browser.actions().click().perform();
   });

   it('Deve abrir detalhamento da primeira loja',()=>{
      expect(lojaPage.verificarUrl()).toBe('http://localhost:4200/home/lojas');
      expect(lojaPage.doubleClickElementoLista(1));
      lojaPage.pressionarBotao('Fechar');
   });

   it('Deve editar loja escolhida',()=>{
      lojaPage.editarLojaSelecionada(2);
      lojaPage.inputDadosByAtributoName('nome','Nome da loja Alterado');
      lojaPage.cadastrarLoja();
      expect(element(by.className('alert-info')).isPresent()).toBe(true);
      browser.actions().click().perform();
   });

    it('Deve excluir loja escolhida',()=>{
      lojaPage.excluirLojaSelecionada(3);
      lojaPage.pressionarBotao('delete');
      lojaPage.pressionarBotao('Fechar');
      // expect(element(by.className('alert-success')).isPresent()).toBe(true);
      // browser.actions().click().perform();
   });

   it('Deve buscar por loja',()=>{
      lojaPage.inputDadosByAtributoName('search','ABC');
      browser.sleep(3000);
   });
 
});