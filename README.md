# API - Autenticação e Autorização de Usuários

Visando a segurança e consistência dos dados, toda API em produção necessita de filtros de usuários. A forma mais comum atualmente para realizar esta segurança é baseada em autenticação e autorização.

- A autenticação de usuários é comumente realizada via Token JWT (Json Web Token), este token é dividido em três partes, sendo a primeira parte o header da requisição contendo o tipo da cryptografia e o tipo do token, a segunda parte sendo o payload (carga útil) que carrega todos os dados inseridos no login para que a aplicação consiga identificar o usuário posteriormente e ter acesso aos seus dados, a última parte do JWT é a cryptografia do header e do payload, seguido pela chave secreta. A SECRET_KEY ou chave secreta é uma string utilizada para cryptografar os dados da requisição e também utilizado para a aplicação validar se o token enviado realmente foi criado pela aplicação.

- A autorização é baseada nos dados do JWT, ao realizar o login é inserido no payload (carga útil) do usuário a sua role pertencente, que é recuperada pela aplicação e validada em cada endpoint. Por exemplo, se um usuário com role de USER tentar acessar um end-point de role exclusivamente ADMIN, é feito uma verificação e retornado um 401 - Unauthorized indicando que o usuário não possui acesso autorizado. 

## Sobre 
Esta API foi desenvolvida visando criar a autenticação de usuários cadastrados em rotas públicas e a autorização destes usuários em rotas privadas baseado em suas roles (permissões de usuário como USER ou ADMIN).

- Usuários com a role USER só podem excluir a sua própria conta, alterar os seus próprios dados e visualizar apenas os seus próprios dados.
- Usuários com a role ADMIN conseguem visualizar todos os usuários, alterar e deletar todos os usuários, além de todas as funções de USER.

## Comece por aqui

### Algumas informações importantes antes de rodar o projeto

1. A aplicação da API utiliza por padrão a porta *3000*, caso precise alterar esta porta por qualquer motivo que seja, altere dentro do *docker-compose.yaml*

2. O banco de dados da aplicação é o MongoDb na versão 5.0 que utiliza a porta 27017 como padrão, caso possua algum mongodb local rodando, siga este passo à passo (Linux Debian):

    
    #### Este comando irá parar o service do mongodb local e impedir que haja conflito:
    ```sudo systemctl stop mongod ``` 

    #### Após realizar o teste do projeto, poderá iniciar novamente o seu mongodb local com este comando:
    ```sudo systemctl start mongod```


> Caso seu sistema operacional seja diferente, adapte as resoluções para sua realidade.

### Iniciando o projeto

#### Em seu terminal, selecione um caminho e faça o clone do projeto
``` git clone https://github.com/Gabrielsoac/api-user-authentication.git```

#### Navegue até a pasta raíz do projeto e o inicie com o comando do Docker Compose

> Caso não tenha o docker instalado e não saiba como utilizá-lo, siga a documentação: https://docs.docker.com/engine/install/

```docker compose up -d```

> O -d permitirá que o projeto rode em "background"

#### Verifique se o projeto está funcionando sem erros
```docker ps``` ou ```watch docker ps ```

> Com o watch é possível ficar enxergando o estado dos containers rodando em live.

### End-Points

#### /Register (POST)
- Código de retorno: ```201``` (CREATED)
- Método Rest: ```POST```
- Descrição: Realiza o cadastro de um novo usuário, podendo lançar erros caso o nome de usuário ou email já exista
- Método de envio de dados: ```Body```
- Modelo de dado enviado via body: ```json```
- Exemplo de JSON de envio:
    ```
    {
        "username": "johndoe",
        "email": "johndoe@mail.com",
        "password": "johndoe123",
        "role": "USER"
    }
    ```
- Exemplo de JSON de retorno:

    ```
    {
        "id": "67c9f1c52e575f8a7531c182",
        "username": "johndoe",
        "email": "johndoe@mail.com",
        "role": "USER"
    }


    ```

#### /Login (POST)
- Método Rest: ```POST```
- Código de retorno: ```200``` (OK)
- Descrição: Realiza o login de um usuário já cadastrado, podendo lançar erros caso o nome de usuário ou senha está incorreto, retorna um token jwt para ser utilizado nas próximas requisições
- Método de envio de dados: ```Body```
- Modelo de dado enviado via body: ```json```
- Exemplo de JSON de envio:
    ```
    {
	    "username": "johndoe",
	    "password": "johndoe123"
    }
    ```
- Exemplo de Token retornado:
    ```
    {
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3YzlmMWM1MmU1NzVmOGE3NTMxYzE4MiIsInVzZXJuYW1lIjoiZ2FicmllbCIsInJvbGUiOiJVU0VSIiwiaWF0IjoxNzQxMjg3ODgzLCJleHAiOjE3NDEyOTE0ODN9.sMsrKTmKUOxFlIeYSt6NBHawK0jWK6lYlP815yuvYLU"
    }
    ```

#### /profile (GET)
- Método Rest: ```GET```
- Código de retorno: ```200``` (OK)
- Descrição: Visualiza o perfil do usuário autenticado
- Método de envio de dados: ```none```
- Modelo de dado enviado via body: ```none```
- Necessário enviar um Token JWT Válido para realizar esta requisição

> OBS: Não é uma boa prática retornar a senha do usuário em seus dados de perfil, para fins didáticos e de aprendizado, foi retornado o usuário completo.
- Exemplo de Token retornado:
    ```
    {
        "id": "67c9f1c52e575f8a7531c182",
        "username": "gabriel",
        "email": "gabriel@mail.com",
        "password": "$2a$10$YF6uQiTK/6m4hwRxwo56/O/EHjV9toGlCE6rVtnZA/gV8VS0r00j6",
        "role": "USER"
    }
    ```

#### /id (GET)
- Método Rest: ```GET```
- Descrição: Visualiza o perfil de um usuário
- ROLE: ```ADMIN```
- Método de envio de dados: ```params```
- Modelo de dado enviado via params: ```localhost:3000/67c9f1c52e575f8a7531c182```
- Necessário enviar um Token JWT Válido para realizar esta requisição

> OBS: Não é uma boa prática retornar a senha do usuário em seus dados de perfil, para fins didáticos e de aprendizado, foi retornado o usuário completo.
- Exemplo de Token retornado:
    ```
    {
        "id": "67c9f1c52e575f8a7531c182",
        "username": "gabriel",
        "email": "gabriel@mail.com",
        "password": "$2a$10$YF6uQiTK/6m4hwRxwo56/O/EHjV9toGlCE6rVtnZA/gV8VS0r00j6",
        "role": "USER"
    }
    ```

#### / (GET)
- Método Rest: ```GET```
- Código de retorno: ```200``` (OK)
- Descrição: Visualiza o perfil de todos os usuários
- ROLE: ```ADMIN```
- Método de envio de dados: ```none```
- Modelo de url: ```localhost:3000/```
- Necessário enviar um Token JWT Válido para realizar esta requisição

> OBS: Não é uma boa prática retornar a senha do usuário em seus dados de perfil, para fins didáticos e de aprendizado, foi retornado o usuário completo.
- Exemplo de Token retornado:
    ```
    [
        {
            "id": "67c9fce52e575f8a7531c18a",
            "username": "johndoe",
            "email": "johndoe@mail.com",
            "password": "$2a$10$OJ0DPbMV0ENdCwzcgv6inefkhX5Lfcm0EaQjH0gEqxSm9AGO.Rliq",
            "role": "USER"
        },
        {
            "id": "67c9ff4c2e575f8a7531c190",
            "username": "mariedoe",
            "email": "mariedoe@mail.com",
            "password": "$2a$10$96JzN7b7Y3Y0G/VUbmS2AufB99dJ9s6w7wI5hMD9lZAX8uOO4Bz.K",
            "role": "ADMIN"
        }
    ]
    ```

#### /id (PUT)

- Método Rest: ```PUT```
- Código de retorno: ```200``` (OK)
- Descrição: Realiza a atualização de um usuário, podendo lançar erros caso o nome de usuário ou email já exista, usuários podem atualizar apenas o seu próprio perfil, administradores podem atualizar qualquer perfil.
- ROLE: ```ADMIN``` e ```USER```
- Método de envio de dados: ```params```
- Modelo de dado enviado via params: ```localhost:3000/67c9f1c52e575f8a7531c182```

> Usuários com a role USER não conseguem atualizar a sua própria role para ADMIN

- Exemplo de JSON de envio:
    ```
    {
        "username": "johndoesilva",
        "email": "johndoesilva@mail.com",
        "password": "johndoe123",
        "role": "USER"
    }
    ```
- Exemplo de JSON de retorno:

    ```
    {
        "id": "67c9f1c52e575f8a7531c182",
        "username": "johndoesilva",
        "email": "johndoesilva@mail.com",
        "role": "USER"
    }
    ```

#### /id (DELETE)
- Método Rest: ```DELETE```
- Código de retorno: ```204``` (NO CONTENT)
- Descrição: Deleta um usuário, usuários com a role USER conseguem deletar apenas a si mesmos, usuários com a role ADMIN conseguem deletar a si e a outros usuários. 
- ROLE: ```ADMIN``` e ```USER```
- Método de envio de dados: ```params```
- Modelo de dado enviado via params: ```localhost:3000/67c9f1c52e575f8a7531c182```
- Necessário enviar um Token JWT Válido para realizar esta requisição