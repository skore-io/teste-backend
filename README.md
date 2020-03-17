<h1 align="center">Teste Backend</h1>

Projeto em NestJS com endpoints para as seguintes ações:

- Criação de conteúdo para o payload abaixo:

POST /media <br/>
Body: { <br/>
      id: number; <br/>
      name: string; <br/>
      duration: number; <br/>
      provider: string; <br/>
      media_type: string; <br/>
      provider_id: string; <br/>
      expires_at: number; <br/>
}<br/>

- Edição de conteúdo por **id**

PATCH /media <br/>
Body: { <br/>
      id: number; <br/>
      name: string; <br/>
      duration: number; <br/>
      provider: string; <br/>
      media_type: string; <br/>
      provider_id: string; <br/>
      expires_at: number; <br/>
} <br/>

- Recuperação de conteúdo por **id** <br/>

GET /media/:id <br/>

- Deleção de conteúdo por **id** <br/>

DELETE /media/:id <br/>


### Requisitos

- Toda vez que um conteúdo for recuperado por **id** deverá ser calculado a propriedade: **expired**

      A propriedade expired é verdadeira quando expires_at for menor que a data atual (ambos timestamp)

- Toda vez que um conteúdo for recuperado por **id** deverá ser informada a propriedade: **watched**

      A propriedade watched é verdadeira quando o conteúdo já tiver sido obtido alguma vez

- Caso um conteúdo já existente em memória tente ser criado com o mesmo **id** uma exceção deverá ser lançada

- Ao editar um conteúdo, o antigo deve ser sobrescrito com o que esta sendo enviado na requisição

      A propriedade watched deve ser false
