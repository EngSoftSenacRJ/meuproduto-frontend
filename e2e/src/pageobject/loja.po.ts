import { browser, element, by } from 'protractor';

export class LojaPage{
    goToMenuLoja(){
        element(by.buttonText('Gerencia Adm.')).click();
        return element(by.buttonText('Lojas')).click();
    }

    goToCadastroLoja(){
        return element(by.id('btn-add')).click();
      }
    verificarUrl(){
        return browser.getCurrentUrl();
    }

    gerarDadosLoja(nome, valor){
        return element(by.css(`input[name="${nome}"]`)).sendKeys(valor);
    }

    cadastrarLoja(){
        return element(by.buttonText('Confirmar')).click();
    }
    


}