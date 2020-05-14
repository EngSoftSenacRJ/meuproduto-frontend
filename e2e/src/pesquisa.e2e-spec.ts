import { ComponentInterface } from "./pageobject/common.po";

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

    });

    
    
});