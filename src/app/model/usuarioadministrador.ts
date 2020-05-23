import { Loja } from './loja';

export interface Usuarioadministrador {
    "id": number,
    "usuarioType": string,
    "bairroEnderecoPessoal": string,
    "cepEnderecoPessoal": number,
    "cpf": number,
    "cidadeEnderecoPessoal": string,
    "username": string,
    "estadoEnderecoPessoal": string,
    "nome": string,
    "numeroEnderecoPessoal": number,
    "ruaEnderecoPessoal": string,
    "telefoneContato": string,
    "dataAniversario": string,
    "password": string,
    "newPassword": string,
    "usernameAdministrador": string,
    "enabled": Boolean,
    "emailConfirmado": boolean,
    "lojaId": number,
    "lojaResource": Loja
}
