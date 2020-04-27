import { browser, element, by } from 'protractor';

export class CadastroAdminPage{

    goToCadastro(){
        return browser.get('/home/cadastro');
    }

    registrarDadosAdmin(nome, valor){
        return element(by.css(`input[name="${nome}"]`)).sendKeys(valor);
        }

    confirmaCadastro(){
        return element(by.buttonText('Concluir'));
    }
}