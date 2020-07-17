import { element, by } from 'protractor';

export class ProdutoPage{
    goToMenuProduto(){
        element(by.buttonText('Gerência Loja')).click();
        return element(by.buttonText('Catálogo da Loja')).click();
    }

    getLinha(indice){
        var item = element(by.repeater('associa-list').row(indice));
        return item;
    }

    editarPrecoProdSelecionada(indice){
        let item = this.getLinha(indice);
     return item. element(by.buttonText('Editar preço')).click();
    }

    excluirAssociaLojaSelecionada(indice){
        let item = this.getLinha(indice);
        return item.element(by.buttonText('delete')).click();
    }

    inputDadosByFormControl(nome, valor){
        return element(by.css(`input[formControlName="${nome}"]`)).sendKeys(valor);
    }
    
}