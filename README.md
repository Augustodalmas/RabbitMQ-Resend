# Projeto de Estudo - RabbitMQ

Este projeto foi desenvolvido com o objetivo de estudar o funcionamento do **RabbitMQ** e o uso de **filas para comunicação assíncrona entre serviços**.

A aplicação simula o **registro de usuários**, onde uma API envia uma mensagem para uma fila no RabbitMQ. Um **Worker** consome essa fila e executa uma ação posterior: o envio de um email para o usuário.

---

# Arquitetura do Projeto
O fluxo da aplicação funciona da seguinte forma:
1. O usuário realiza um registro através da API.
2. A **API em Node.js** envia uma mensagem para a fila `register` no RabbitMQ.
3. Um **Worker em Python** escuta essa fila utilizando a biblioteca **Pika**.
4. O Worker processa a mensagem e envia um **email** utilizando o serviço **Resend**.

Fluxo simplificado:

Cliente -> API (Node.js) -> RabbitMQ -> Worker (Python + Pika) -> Resend (Email)

---

# Tecnologias Utilizadas
- RabbitMQ
- Docker
- Node.js (API)
- Python (Worker)
- Pika (cliente RabbitMQ para Python)
- Resend (envio de emails)

---

# Executando o RabbitMQ com Docker

O projeto possui um arquivo **docker-compose.yml** que inicia um container do RabbitMQ para facilitar o ambiente de estudo.

Para subir o container execute:
```bash
docker-compose up -d
```
Após a inicialização, o painel administrativo do RabbitMQ estará disponível em:

http://localhost:15672

Credenciais padrão:

Usuário: admin

Senha: admin


# Funcionamento da API (Node.js)

A API simula o registro de usuários em uma base de dados.

Quando um novo usuário é registrado:

A API recebe os dados do usuário

Simula o registro no banco de dados

Envia uma mensagem para a fila register no RabbitMQ

Exemplo de mensagem enviada para a fila:

{
  "email": "usuario@email.com",
  "senha": "123456"
}

# Worker (Python + Pika)

O Worker é responsável por consumir mensagens da fila register.

Funcionamento:

O Worker fica escutando a fila no RabbitMQ

Quando uma nova mensagem chega, ele lê os dados do usuário

Processa o evento de criação

Envia um email de confirmação utilizando o serviço Resend

Exemplo de resposta enviada ao usuário:

'Usuário criado com sucesso!'


# Objetivo do Projeto

Utilizado para estudo dos seguintes conceitos:

Comunicação assíncrona entre serviços

Uso de filas de mensagens

Integração entre diferentes linguagens (Node.js + Python)

Workers para processamento assíncrono

