import { browser, element, by } from 'protractor';

export class LoginAdminPage{

        acessarLoginAdmin(){
            return browser.get('/login');
        }

        verificarUrl(){
            return browser.getCurrentUrl();
        }

        pegarInput(name, valor){
            element(by.css(`input[name="${name}"]`)).sendKeys(valor);
        }

        pegarBotaoLogin(){
            return element(by.buttonText('Acessar'));
        }

        // limparElementos(){
        //     element(by.css(`input[name="username"]`)).clear();
        //     element(by.css(`input[name="password"]`)).clear();
        // }
}