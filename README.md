# Venda de vinhos do Velasquez

Esse projeto tenta atender as necessidades propostas pelo senhor Velasquez, conforme descrito em documento detalhando cada ponto separadamente

[Acesse a aplicação aqui](https://ubots-c5275.web.app/)

## Ideias do senhor Velasquez

O senhor Velasquez possui uma loja de venda de vinhos, uma loja antiga de vários anos. Seu Velasquez já fez muito sucesso nas vendas um dia e guardou todos os dados sobre suas vendas e seus clientes em uma caderneta. Visando melhorar suas vendas, seu Velasquez resolveu usar da tecnologia e comprar um sistema que atendesse as suas necessidades para dar um atendimento personalizado aos seus clientes e tentar conquistar uma nova clientela para seu negócio.

Seu Velasquez solicitou quatro principais funcionalidades em seu sistema. São elas:

1. Liste os clientes ordenados pelo maior valor total em compras
  - Seu Velasquez gostaria de ver os clientes que mais gastaram em sua loja para fazer uma oferta especial e trazê-los de volta ao estabelecimento novamente. Você deverá mostrar uma lista para o seu Velasquez na tela do sistema contendo todos os usuários cadastrados no sistema ordenados pelo valor total gasto desde a abertura do estabelecimento.
2. Mostre o cliente com maior compra única no último ano (2016)
  - O ano de 2016 foi um ano muito especial para o seu Velasquez, ele fez uma grande promoção de vinhos em sua loja pois a safra estava muito boa e o país estava em um bom momento econômico. Isso levou o seu Velasquez a alavancar seu negócio em questão de meses. Seu Velasquez quer ver outra lista na tela do sistema que mostre os clientes que fez a maior compra no ano de 2016.
3. Liste os clientes mais fiéis
  - Seu Velasquez preza muito pela fidelidade de seus clientes. Aproveitando o embalo e todas as maravilhas da tecnologia, seu Velasquez gostaria de ter uma lista ordenada dos clientes que mais fizeram compras em sua loja desde que ele a abriu. Para isso, contabilize o número de compras de cada cliente e ordene em uma tabela para análise.
4. Recomende um vinho para um determinado cliente a partir do histórico de compras
  - Existem vários clientes que frequentam a loja de seu Velasquez. Nem todos eles entram sabendo o que querem. Embora seu Velasquez seja muito bom nas recomendações, ele não consegue analisar cada caso individualmente e recomendar o vinho perfeito para a ocasião, porque mesmo sendo bom, seu Velasquez é só um. Para resolver esse problema, o sistema deverá ter um sistema de recomendações de vinho automáticas que se baseia no vinho mais comprado por cada cliente. Crie uma tabela que mostre o nome de cada cliente e o vinho mais recomendado para compra.

## Desenvolvimento do projeto

O projeto inteiro foi desenvolvido utilizando React como framework de front-end. Os dados estão sendo servidos em uma API da empresa Ubots, empresa que propôs o desafio. Neste projeto, além de utilizar o React como tecnologia principal no front-end, utilizei também SCSS, Jest, Enzyme, React Hooks, Axios e algumas outras dependências fundamentais para o bom funcionamento do projeto. O projeto possui apenas uma única página, sem rotas, apenas componentes que permitem uma melhor reutilização de código e tornam o projeto menos verboso.

Também fiz uso de git hooks para garantir que apenas código de qualidade entrará no repositório do projeto, checando por regras de lint, identação, testes e build no hook de pre-push, ou seja, toda vez que o usuário executar um git push. Dessa forma, não teremos código quebrado no repositório e podemos confiar na versão do projeto que está lá.

## Preocupações com performance

A performance do projeto foi bem desenvolvida dado o prazo estipulado para entrega do mesmo pela empresa. Como a carga de dados é pequena e possuo poucas informações sobre ela, tive que usar alguns métodos de comparação um pouco caros em termos de performance, como deep equality utilizando JSON.stringfy em alguns objetos pela falta de uma primary key, ou também convertendo string para number e removendo caracteres que não fossem dígitos de uma string antes de dar o parse. Apesar disso tudo, a aplicação ficou bem performática.
  
Poderiamos passar um ar de maior responsividade ao usuário e menos tempo de espera em carregamentos e processamento de dados no inicio da aplicação fazendo com que o processamento de dados fosse executado no momento que o usuário clicasse em cada uma das abas, mas é uma espada de dois gumes, processar todos os dados na inicialização iria gerar um maior tempo de espera para a abertura da aplicação mas traria respostas instantâneas para os cliques futuros do usuário. Ao mesmo tempo, processar os dados no momento do clique iria produzir uma abertura da aplicação mais rápida, porém, a responsividade no primeiro clique do usuário em cada aba poderia não ser tão satisfatória.

Embora todas essas questões de performance tenham sido levantadas aqui, não é algo realmente significante pra quantidade de dados que estamos tratando aqui, a responsividade ainda é praticamente instantânea em todos os casos, mas vale expor as ideias para caso a aplicação comece a escalar de maneira astronômica.

## Comandos disponíveis do projeto

Na pasta do projeto, você pode utilizar

### `npm start`

Inicia a aplicação em modo de desenvolvimento.<br />
Abra [http://localhost:3000](http://localhost:3000) para ver no navegador.

A página irá recarregar se você alterar os arquivos.<br />
Você também verá qualquer erro de lint no console.

### `npm test`

Inicia o jest e roda todos os testes disponíveis na aplicação.<br />

### `npm run build`

Builda a aplicação e armazena os resultados do build na pasta `build`.<br />

O build é minificado e os nomes de arquivos incluem os hashes.<br />
