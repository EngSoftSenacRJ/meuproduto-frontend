import { browser, element, by, WebElement } from 'protractor';

export class LojaPage{
    goToMenuLoja(){
        element(by.buttonText('Gerencia Adm.')).click();
        return element(by.buttonText('Lojas')).click();
    }
    
    goToCadastroLoja(){
        return element(by.id('btn-add')).click();
    }

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

    cadastrarLoja(){
        return element(by.buttonText('Confirmar')).click();
    }

    getLinha(indice){
        var item = element(by.repeater('loja-list').row(indice));
        return item;
    }
    
    doubleClickElementoLista(indice){
        let item = this.getLinha(indice);
     return browser.actions().doubleClick(item).perform();
    }

    editarLojaSelecionada(indice){
        let item = this.getLinha(indice);
     return item. element(by.buttonText('description')).click();
    }

    excluirLojaSelecionada(indice){
        let item = this.getLinha(indice);
        return item.element(by.buttonText('delete')).click();
    }

    confirmarExclusaoLoja(){
        return element(by.css('.btn .btn-default #simBtn')).click();
    }
}