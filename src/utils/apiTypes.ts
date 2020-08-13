/**
 * Define a interface de retorno da API para usuários
 */
export interface UsuarioHttp {
  id: number;
  nome: string;
  cpf: string;
}

/**
 * Define a interface de retorno da API para vendas
 */
export interface Venda {
  codigo: string;
  data: string;
  cliente: string;
  valorTotal: number;
  itens: Item[];
}

/**
 * Define a interface de retorno da API para itens que compõem uma venda
 */
export interface Item {
  codigo?: string;
  produto: string;
  variedade: string;
  pais: string;
  categoria: string;
  safra: string;
  preco: number;
}
