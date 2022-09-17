# Dt-Money
Aplicativo full stack para CRUD de transações

Back-end em node.js com express utilizando o prisma orm na pasta server

Front-end em ReactJS na pasta web

### Techs:
<ul>
  <li>Node.js</li>
  <li>Express</li>
  <li>Prisma</li>
  <li>ReactJS</li>  
  <li>Styled Components</li>  
  <li>Radix UI</li>  
  <li>React Hook Form</li>  
</ul>

## Back-end

Rotas:
<ul>
  <li>
    <b>/transactions</b>
    <p>Pode ser chamada com os métodos get e post</p>
    <ul>
      <li>
        Get
        <p>Retorna a listagem completa das transações</p>
        <p>Pode receber os seguintes query params, que são opcionais:</p>
        <ul>
          <li>q: deve ser passado com um string para pesquisa-lo no db e retornar apenas as transações que o contenham</li>
          <li>_sort e _order: _sort pode conter os seguintes valores: id, description, type, category, price ou createdAt para ordenar os dados pelo valor passado, e _order deve conter "asc" ou "desc" para indicar a ordem de ordenação. Devem ser passados em conjunto</li>
          <li>_page e _limit: são passados para paginação, _limit deve conter o tamanho de cada página e _page a página alvo (1,2,3,4...). Devem ser passados em conjunto</li>
        </ul>
      </li>
      <li>
        Post
        <p>Chamada para a criação de transações, o body precisa conter os seguintes parâmetros:</p>
        <ul>
          <li>category: string</li>
          <li>description: string</li>
          <li>price: number (em centavos, eg: R$ 10,50 -> 1050)</li>
          <li>type: 'income' | 'outcome'</li>
        </ul>
      </li>
    </ul>
  </li>
</ul>

## Front-end

![image](https://user-images.githubusercontent.com/92460628/190509130-048b18a1-d56b-456b-984c-181bb528e4c8.png)

![image](https://user-images.githubusercontent.com/92460628/190509223-7c5ea7c9-1f0a-4b96-9aae-7c90a030b8c2.png)

![image](https://user-images.githubusercontent.com/92460628/190509250-98723e35-8b92-41b1-92e1-e685f4a423ba.png)
