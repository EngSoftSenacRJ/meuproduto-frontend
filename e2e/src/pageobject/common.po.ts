import { element, browser, by } from 'protractor';

export class ComponentInterface{
    pressionarBotao(nome){
        return element(by.buttonText(nome)).click();
    }

    pressionarBotaoById(nome){
        return element(by.id(nome));
    }

    verificarUrl(){
        return browser.getCurrentUrl();
    }

    limparCampoInput(nome){
        element(by.css(`input[name="${nome}"]`)).clear();
    }

    inputDadosByAtributoName(nome, valor){
        element(by.css(`input[name="${nome}"]`)).clear();
        return element(by.css(`input[name="${nome}"]`)).sendKeys(valor);
    }
}