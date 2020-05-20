<h1 align="center">Teste Backend</h1>
<h5 align="center">Nosso teste para conhecer como você codifica no dia-dia</h5>

### Tecnologias na Skore

Nossa stack para microserviços é a seguinte:

- Typescript
- Nest.js
- Jest

### Observações

Esta é uma avaliação básica de código.

O objetivo é conhecer um pouco do seu conhecimento/práticas código.

Recomendamos que você não gaste mais do que 4 - 6 horas.

Faça um fork deste repositório.

Ao finalizar o teste, submeta um pull request para o repositório que nosso time será notificado.

### Tarefas

Com a seguinte representação de um conteúdo:

```json
{
  "id": 1,
  "name": "GOTO 2017 • The Many Meanings of Event-Driven Architecture • Martin Fowler",
  "duration": 3006,
  "provider": "youtube",
  "media_type": "video",
  "provider_id": "STKCRSUsyP0",
  "expires_at": 1580428851394,
  "watched": false,
  "expired": false
}
```

Crie endpoints para as seguintes ações:

- [ x ] Criação de conteúdo onde o payload será o json informado acima (exceto as propriedades **watched** e **expired**)

- [ x ] Edição de conteúdo por **id**

- [ x ] Recuperação de conteúdo por **id**

- [ x ] Deleção de conteúdo por **id**

### Requisitos

- [ x ] Toda vez que um conteúdo for recuperado por **id** deverá ser calculado a propriedade: **expired**

      A propriedade expired é verdadeira quando expires_at for menor que a data atual (ambos timestamp)

- [ x ] Toda vez que um conteúdo for recuperado por **id** deverá ser informada a propriedade: **watched**

      A propriedade watched é verdadeira quando o conteúdo já tiver sido obtido alguma vez

- [ x ] Caso um conteúdo já existente em memória tente ser criado com o mesmo **id** uma exceção deverá ser lançada

- [ x ] Ao editar um conteúdo, o antigo deve ser sobrescrito com o que esta sendo enviado na requisição

      A propriedade watched deve ser false

### Dicas

- Os conteúdos podem ficar em memória, não é necessário persistir os dados
- Utilize Nestjs com TypeScript
- Caso tenha alguma dúvida, tome uma decisão e explique no PR
- Testes são sempre bem-vindos :smiley:

### Documentação

##### Rodando a aplicação

```ssh
    $ yarn
    $ yarn run start
```

##### Rodando os testes

```ssh
      $ yarn run test
```

##### Fazendo chamadas a API

- Criar content

```ssh
$ curl --location --request POST 'localhost:3000/contents' \
--header 'Content-Type: application/json' \
--data-raw '{
  "id": 2,
  "name": "GOTO 2017 • The Many Meanings of Event-Driven Architecture • Martin Fowler",
  "duration": 3006,
  "provider": "vimeo",
  "media_type": "video",
  "provider_id": "STKCRSUsyP0",
  "expires_at": 1580428851394
}'
```

retornos 200 quando sucesso, 400 em caso de id repetido ou campos nao informados

- Buscando request

```ssh
      curl --location --request GET 'localhost:3000/contents/2'
```

retornos 200 ok com o conteudo no body ou 404 quando nao encontrado

- Atualizando request

```ssh
curl --location --request PUT 'localhost:3000/contents/2' \
--header 'Content-Type: application/json' \
--data-raw '{
  "name": "GOTO 2017 • The Many Meanings of Event-Driven Architecture • Martin Fowler",
  "duration": 3006,
  "provider": "vimeo",
  "media_type": "video",
  "provider_id": "STKCRSUsyP0",
  "expires_at": 1580428851394
}'
```

retornos 200 quando sucesso, 400 campos nao informados e 404 em caso de not found

- Removendo conteudo

```ssh
      curl --location --request DELETE 'localhost:3000/contents/2'
```
