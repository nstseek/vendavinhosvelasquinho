import React, { useEffect, useReducer } from 'react';
import './App.scss';
import { UsuarioHttp, Item, Venda } from './utils/apiTypes';
import Axios from 'axios';
import Lista from './components/Lista/Lista';
import ModalWarning, {
  WarningState
} from './components/ModalWarning/ModalWarning';
import Loading from './components/Loading/Loading';
import Tab from './components/Tab/Tab';
import logo from './assets/imgs/0.png';

/**
 * Define uma nova interface de usuário utilizada pela aplicação após a análise de dados que serve para armazenar os resultados na memória e evitar processamento desnecessário
 */
interface Usuario extends UsuarioHttp {
  valorGasto: number;
  indiceFidelidade: number;
  recomendacao: Item;
  valorCompraUltimoAno: number; // ultimo ano seria 2016, conforme descrito no documento de definição
}

/**
 * Define o estado do componente base da aplicação, utilizando conceitos originalmente aplicados no Redux e hoje amplamente utilizados pela comunidade React
 */
interface State {
  usuarios: Usuario[];
  loading: boolean;
  warning: WarningState;
  activeTab: Tabs;
}

/**
 * Define os ActionTypes da store do nosso componente, para orientar o reducer
 */
enum ActionTypes {
  UpdateData = 0,
  UpdateLoading,
  UpdateWarning,
  CloseWarning,
  ClearWarning,
  UpdateStatus,
  UpdateTab
}

enum Tabs {
  ValorTotal = 0,
  CompraUnica,
  ClientesFieis,
  Recomendacao
}

/**
 * Define o estado inicial do componente
 */
const initialState: State = {
  usuarios: [],
  loading: false,
  activeTab: null,
  warning: {
    text: null,
    title: null,
    open: false
  }
};

/**
 * Define a lógica do reducer a ser aplicada toda vez que o `dispatch` for executado dentro do componente,
 * passando uma action(objeto contento type e payload) como parâmetro na chamada da função `dispatch` que será recebido
 * como o parâmetro `action` em nosso reducer, que será executado logo após a execução do `dispatch` e retornará o novo estado
 * do componente, acessível para todos os usos e causando uma atualização do componente
 * @param state Antigo estado da aplicação
 * @param action `Action` enviada como parâmetro na função `dispatch`,
 * utilizada para definir a lógica que deverá ser utilizada para gerar o novo estado
 */
const reducer = (
  state,
  action: { type: ActionTypes; payload?: Partial<State> }
): State => {
  const { usuarios, loading, warning, activeTab } = action.payload
    ? action.payload
    : initialState;
  switch (action.type) {
    case ActionTypes.UpdateData:
      return {
        ...state,
        usuarios,
        loading,
        activeTab
      };
    case ActionTypes.CloseWarning:
      return {
        ...state,
        warning: { ...state.warning, open: false }
      };
    case ActionTypes.UpdateStatus:
      return {
        ...state,
        warning,
        loading
      };
    case ActionTypes.UpdateTab:
      return {
        ...state,
        activeTab
      };
    case ActionTypes.UpdateLoading:
      return {
        ...state,
        loading
      };
    case ActionTypes.UpdateWarning:
      return {
        ...state,
        warning: { ...state.warning, ...warning }
      };
    case ActionTypes.ClearWarning:
      return {
        ...state,
        warning: initialState.warning
      };
    default:
      return state;
  }
};

/**
 * Converte os usuários para um array de duas dimensões que contém os dados
 * @param usuarios Usuários a serem convertidos
 */
const mapUsuariosToTable = (usuarios: Usuario[]): any[][] =>
  usuarios.map((usuario) =>
    Object.values({
      ...usuario,
      valorCompraUltimoAno:
        'R$ ' + usuario.valorCompraUltimoAno.toFixed(2).replace('.', ','),
      valorGasto: ('R$ ' + usuario.valorGasto.toFixed(2)).replace('.', ',')
    })
  );

const App: React.FC = () => {
  const [state, dispatch] = useReducer<typeof reducer>(reducer, initialState);

  useEffect(() => {
    (async () => {
      try {
        dispatch({
          type: ActionTypes.UpdateLoading,
          payload: { loading: true }
        });
        const usuarios = (
          await Axios.get<UsuarioHttp[]>(
            'https://www.mocky.io/v2/598b16291100004705515ec5'
          )
        ).data;
        const vendas = (
          await Axios.get<Venda[]>(
            'https://www.mocky.io/v2/598b16861100004905515ec7'
          )
        ).data;
        const vinhos: Item[] = [];
        vendas.forEach((venda) => {
          venda.itens.forEach((item) => {
            if (
              vinhos.findIndex(
                /*  
                  Neste caso o JSON.stringfy é utilizado para garantir a igualdade profunda(deep equality) dos objetos sendo comparados,
                  já que o objeto não possui uma propriedade id e não foi definido no desafio nenhuma PK para os vinhos.
                  Após uma análise rasa percebi que talvez a junção da propriedade produto + variedade forme uma PK composta para os vinhos,
                  mas não testei mais a fundo e decidi utilizar esse método para garantir a confiabilidade dos dados.
                */
                (vinho) => JSON.stringify(vinho) === JSON.stringify(item)
              ) === -1
            ) {
              vinhos.push(item);
            }
          });
        });
        const parsedUsers = usuarios.map<Usuario>((usuario) => {
          let valorGasto = 0;
          let indiceFidelidade = 0;
          let valorCompraUltimoAno = 0;
          const vinhosComprados = vinhos.map((vinho) => ({
            ...vinho,
            compras: 0
          }));
          vendas.forEach((venda) => {
            if (
              Number(venda.cliente.replace(/\D/g, '')) ===
              Number(usuario.cpf.replace(/\D/g, ''))
            ) {
              indiceFidelidade += 1;
              valorGasto += venda.valorTotal;
              valorCompraUltimoAno =
                new Date(venda.data).getFullYear() === 2016 && venda.valorTotal > valorCompraUltimoAno
                  ? venda.valorTotal
                  : valorCompraUltimoAno;
              venda.itens.forEach((item) => {
                const vinho = vinhos.findIndex(
                  (vinho) => JSON.stringify(vinho) === JSON.stringify(item)
                );
                if (vinho || vinho === 0) {
                  vinhosComprados[vinho].compras += 1;
                } else {
                  // Aviso para garantir a integridade de dados do sistema
                  alert(
                    'Erro na análise de dados. Vinho comprado não encontrado.'
                  );
                }
              });
            }
          });
          return {
            ...usuario,
            valorCompraUltimoAno,
            indiceFidelidade,
            recomendacao: vinhosComprados.length
              ? vinhosComprados.reduce(
                  (vinhoMaisComprado, vinho) =>
                    vinhoMaisComprado.compras > vinho.compras
                      ? vinhoMaisComprado
                      : vinho,
                  vinhosComprados[0]
                )
              : null,
            valorGasto
          };
        });
        dispatch({
          type: ActionTypes.UpdateData,
          payload: {
            usuarios: parsedUsers,
            loading: false,
            activeTab: Tabs.ValorTotal
          }
        });
      } catch (e) {
        // Aviso para garantir a integridade de dados do sistema
        dispatch({
          type: ActionTypes.UpdateStatus,
          payload: {
            loading: false,
            warning: {
              title: 'Erro',
              text:
                'Ocorreu um erro ao analisar os dados. Entre em contato com o desenvolvedor.',
              open: true
            }
          }
        });
      }
    })();
  }, []);

  return (
    <div className='App'>
      <ModalWarning
        warning={state.warning}
        clearWarning={() =>
          dispatch({
            type: ActionTypes.ClearWarning
          })
        }
        closeWarning={() =>
          dispatch({
            type: ActionTypes.CloseWarning
          })
        }
      />
      <Loading loading={state.loading} />
      <img src={logo} alt='Ubots' id='logo' />
      <div className='tab-container'>
        <Tab
          active={state.activeTab === Tabs.ValorTotal}
          click={() =>
            dispatch({
              type: ActionTypes.UpdateTab,
              payload: {
                activeTab:
                  state.activeTab === Tabs.ValorTotal ? null : Tabs.ValorTotal
              }
            })
          }
          title='#1 - Liste os clientes ordenados pelo maior valor total em compras'>
          <Lista
            tituloColunas={[
              '#',
              'Nome',
              'CPF',
              'Valor de compras em 2016',
              'Índice de fidelidade',
              'Valor total gasto'
            ]}
            data={mapUsuariosToTable(
              state.usuarios.sort((a, b) => b.valorGasto - a.valorGasto)
            )}></Lista>
        </Tab>
        <Tab
          active={state.activeTab === Tabs.CompraUnica}
          click={() =>
            dispatch({
              type: ActionTypes.UpdateTab,
              payload: {
                activeTab:
                  state.activeTab === Tabs.CompraUnica ? null : Tabs.CompraUnica
              }
            })
          }
          title='#2 - Mostre o cliente com maior compra única no último ano (2016)'>
          <Lista
            tituloColunas={[
              '#',
              'Nome',
              'CPF',
              'Valor de compras em 2016',
              'Índice de fidelidade',
              'Valor total gasto'
            ]}
            data={
              state.usuarios.length
                ? mapUsuariosToTable([
                    state.usuarios.reduce((maiorComprador, usuario) =>
                      maiorComprador.valorCompraUltimoAno >
                      usuario.valorCompraUltimoAno
                        ? maiorComprador
                        : usuario
                    )
                  ])
                : null
            }></Lista>
        </Tab>
        <Tab
          active={state.activeTab === Tabs.ClientesFieis}
          click={() =>
            dispatch({
              type: ActionTypes.UpdateTab,
              payload: {
                activeTab:
                  state.activeTab === Tabs.ClientesFieis
                    ? null
                    : Tabs.ClientesFieis
              }
            })
          }
          title='#3 - Liste os clientes mais fiéis'>
          <Lista
            tituloColunas={[
              '#',
              'Nome',
              'CPF',
              'Valor de compras em 2016',
              'Índice de fidelidade',
              'Valor total gasto'
            ]}
            data={
              state.usuarios.length
                ? mapUsuariosToTable(
                    state.usuarios.sort(
                      (a, b) => b.indiceFidelidade - a.indiceFidelidade
                    )
                  )
                : null
            }></Lista>
        </Tab>
        <Tab
          active={state.activeTab === Tabs.Recomendacao}
          click={() =>
            dispatch({
              type: ActionTypes.UpdateTab,
              payload: {
                activeTab:
                  state.activeTab === Tabs.Recomendacao
                    ? null
                    : Tabs.Recomendacao
              }
            })
          }
          title='#4 - Recomende um vinho para um determinado cliente a partir do histórico
          de compras'>
          <Lista
            tituloColunas={['#', 'Nome', 'Recomendação']}
            data={
              state.usuarios.length
                ? state.usuarios
                    .sort((a, b) => a.id - b.id)
                    .map((usuario) => ({
                      id: usuario.id,
                      nome: usuario.nome,
                      recomendacao: `${usuario.recomendacao.produto} - ${
                        usuario.recomendacao.categoria
                      } - ${usuario.recomendacao.variedade} - ${
                        usuario.recomendacao.pais
                      } - ${usuario.recomendacao.safra} - ${
                        'R$ ' +
                        usuario.recomendacao.preco.toFixed(2).replace('.', ',')
                      }`
                    }))
                    .map((data) => Object.values(data))
                : null
            }></Lista>
        </Tab>
      </div>
    </div>
  );
};

export default App;
