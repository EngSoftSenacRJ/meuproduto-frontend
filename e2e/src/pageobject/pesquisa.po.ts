import { browser, element, by, WebElement } from 'protractor';

export class PesquisaPage{

cliqueColuna(rowNumber, colNumber){
    // var item = element.all(by.css('th')).get(rowNumber).all(by.css('td')).get(colNumber);
   return element(by.repeater('pesquisa-list').row(rowNumber)).element(by.css('td')).get(colNumber);
    
}

}