# Dt-Money
Aplicativo full stack para CRUD de transações

Back-end em node.js com express utilizando o prisma orm na pasta server

Front-end em ReactJS na pasta web

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
