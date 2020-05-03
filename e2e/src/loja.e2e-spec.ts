import {LojaPage} from './pageobject/loja.po';
import { browser, element, Key, by } from 'protractor';

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
         lojaPage.gerarDadosLoja(loja.nome, loja.valor);
      });
      lojaPage.cadastrarLoja();
      expect(element(by.className('alert-success')).isPresent()).toBe(false);
      browser.sleep(3000);
   });

   it('Deve editar uma loja com sucesso',()=>{

   });

   it('Deve deletar uma loja',()=>{

   });
   
});