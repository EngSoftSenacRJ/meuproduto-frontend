import { Marca } from './marca';
import { Categoria } from './categoria';
import { Loja } from './loja';

export interface SearchResult {
    "id": number,
    "nome": string,
    "descricao": string,
    "mesesGarantia": number,
    "marca": Marca,
    "categoria":Categoria,
    "preco": number,
    "lojaResource": Loja
}