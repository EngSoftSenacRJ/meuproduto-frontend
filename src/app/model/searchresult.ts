import { Marca } from './marca';
import { Categoria } from './categoria';
import { Loja } from './loja';

export interface SearchResult {
    "produtoId": number,
    "produtoNome": string,
    "produtoDesc": string,
    "produtoMesesGarantia": number,
    "marcaNome": string,
    "categoriaNome": string,
    "lojaProdutoPreco": number,
    "lojaNome": string,

    "lojaCnpj": string,
    "lojaRazaoSocial": string,
    "lojaRuaEnderecoComercial": string,
    "lojaNumeroEnderecoComercial": string,
    "lojaBairroEnderecoComercial": string,
    "lojaCidadeEnderecoComercial": string,
    "lojaEstadoEnderecoComercial": string,
    "lojaCepEnderecoComercial": string,
    "lojaTelefoneContato": string

}