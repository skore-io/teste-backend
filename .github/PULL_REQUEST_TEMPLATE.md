<h1 align="center">Teste Backend</h1>

### What?
  Projeto em NestJS onde rotas do CRUD de uma entidade de mídia foram expostas, seguindo os requisitos abaixo:
  
- [X] Toda vez que um conteúdo for recuperado por **id** deverá ser calculado a propriedade: **expired**

      A propriedade expired é verdadeira quando expires_at for menor que a data atual (ambos timestamp)

- [X] Toda vez que um conteúdo for recuperado por **id** deverá ser informada a propriedade: **watched**

      A propriedade watched é verdadeira quando o conteúdo já tiver sido obtido alguma vez

- [X] Caso um conteúdo já existente em memória tente ser criado com o mesmo **id** uma exceção deverá ser lançada

- [X] Ao editar um conteúdo, o antigo deve ser sobrescrito com o que esta sendo enviado na requisição

      A propriedade watched deve ser false

### Why?
  Pela vontade do aprendizado em novos desafios, projetos, culturas, boas práticas, tecnologias (NestJS) propostos pela Skore, zelando sempre pela simplicidade, transparência e a evolução da empresa e do time.

### Any?
- Por não ser necessário persistir os dados, as mídias são armazenadas em uma lista no seu repositório (media.repository.ts)
- Métodos de alteração e consulta ao "banco" são expostas em arquivos *.repository.ts do respectivo módulo (Obs: foi optado pelas chamadas ao banco serem síncronas por acessaram diretamente a memória; caso fossem persistidas, todos os métodos do repositório seriam assíncronos)
- Regras de negócio são expostas no arquivo *.bo.ts do respectivo módulo e consumidas pelo seu service 
- Testes unitários não realizam consultas e alterações ao banco por questões de performance e integridade dos dados, simulando um projeto real em que são persistidos os dados; por isso suas chamadas foram mockadas (Exceção ao método de atualização, para fins de checar integridade da função). 
- A propriedade expires_at deve ser informada em Unix Timestamp em UTC (GMT+00:00), pois a data atual é gerada neste formato (Desta maneira não é necessário a preocupação com formatação do offset de datas e o servidor poderia ser hospedado em qualquer região)
- As validações foram realizadas utilizando o pacote recomendado pela documentação oficial do NestJS (class-validator)
