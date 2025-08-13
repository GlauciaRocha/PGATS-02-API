# API de Transferências e Usuários

Esta API permite o registro, login, consulta de usuários e transferência de valores entre usuários. O objetivo é servir de base para estudos de testes e automação de APIs.

## Tecnologias
- Node.js
- Express
- Swagger (documentação)

## Instalação

1. Clone o repositório ou baixe os arquivos.
2. Instale as dependências:
   ```
npm install express swagger-ui-express
   ```

## Estrutura de Diretórios
```
controller/         # Controllers das rotas
service/            # Lógica de negócio
model/              # Dados em memória
app.js              # Configuração do app Express
server.js           # Inicialização do servidor
swagger.json        # Documentação Swagger
```

## Como rodar

```bash
node server.js
```

A API estará disponível em `http://localhost:3000`.

Acesse a documentação Swagger em: [http://localhost:3000/api-docs](http://localhost:3000/api-docs)

## Endpoints principais

- `POST /users/register` — Registro de usuário
- `POST /users/login` — Login de usuário
- `GET /users` — Listar usuários
- `POST /transfers` — Transferência de valores

## Regras de negócio

- Login exige usuário e senha.
- Não é permitido registrar usuários duplicados.
- Transferências para destinatários não favorecidos só podem ser feitas se o valor for menor que R$ 5.000,00.
- O "banco de dados" é em memória (variáveis).

## Testes

Para testar com Supertest, importe o `app.js` diretamente.

---

> API criada para fins didáticos de automação e testes.
