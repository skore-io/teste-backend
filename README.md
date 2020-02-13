<h1 align="center">Teste Backend</h1>

- Typescript OK
- Nest.js OK
- Jest FAIL =/ (Segui a documentação, artigos e tutoriais mas não consegui descobrir porque meus testes não funcionaram. Pra não deixar código sujo removi tudo relacionado aos testes...)


Crie endpoints para as seguintes ações:

- [OK] Criação de conteúdo onde o payload será o json informado acima (exceto as propriedades **watched** e **expired**)

- [OK] Edição de conteúdo por **id**

- [OK] Recuperação de conteúdo por **id**

- [OK] Deleção de conteúdo por **id**

### Requisitos

- [OK] Toda vez que um conteúdo for recuperado por **id** deverá ser calculado a propriedade: **expired**

```A propriedade expired é verdadeira quando expires_at for menor que a data atual (ambos timestamp)

  async videoExpired(video, update?: boolean) {
        try {
            let objectExpireDate = video.expires_at.valueOf()
            let actualDate = Date.now().valueOf()
            if (objectExpireDate < actualDate) return await this.model
                .findByIdAndUpdate(
                    video.id,
                    { $set: { expired: true } },
                    { new: true }
                )

            return this.videoWatched(video, update)

        } catch (e) {
            throw new SharedException(e)
        }
    }
```

- [?] Toda vez que um conteúdo for recuperado por **id** deverá ser informada a propriedade: **watched**

```A propriedade watched é verdadeira quando o conteúdo já tiver sido obtido alguma vez
   # No caso achei estranho setar verdadeiro se o vídeo estiver expirado	

   async videoWatched(video, update?: boolean) {
        if (!update) {
            return await this.model
                .findByIdAndUpdate(
                    video.id,
                    { $set: { watched: true } },
                    { new: true }
                )
        }
        return await this.model
            .findByIdAndUpdate(
                video.id,
                { $set: { watched: false } },
                { new: true }
            )
    }
```

- [OK] Caso um conteúdo já existente em memória tente ser criado com o mesmo **id** uma exceção deverá ser lançada

```async create(videoDTO: VideoDto): Promise<Video> {
        const { _id } = videoDTO
        let video = await this.videoModel.findById(_id)
        if (video) throw new SharedException('Duplicate key error!')

        const createdVideo = new this.videoModel(videoDTO)
        return createdVideo.save()
    }
```

- [OK] Ao editar um conteúdo, o antigo deve ser sobrescrito com o que esta sendo enviado na requisição

```A propriedade watched deve ser false

   async update(_id: string, videoDTO: VideoDto): Promise<Video> {
        let video = await this.videoModel.findById(_id)
        if (!video) throw new SharedException('Video not Found')
        await video.updateOne(videoDTO)
        return this.videoWatched(video, true)
    }
```
 


-------------------------------------------------------------------------------------------
<h1 align="center">Teste Backend</h1>
<h5 align="center">Nosso teste para conhecer como você codifica no dia-dia</h5>

### Tecnologias na Skore

Nossa stack para microserviços é a seguinte:

- Typescript
- Nest.js
- Jest

Sugerimos que tente utilizar o mais próximo disso, mas sinta-se à vontade para utilizar o que te deixar mais confortável
e que consiga demonstrar o seu melhor.

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
  "expired": false,
}
```

Crie endpoints para as seguintes ações:

- [ ] Criação de conteúdo onde o payload será o json informado acima (exceto as propriedades **watched** e **expired**)

- [ ] Edição de conteúdo por **id**

- [ ] Recuperação de conteúdo por **id**

- [ ] Deleção de conteúdo por **id**

### Requisitos

- [ ] Toda vez que um conteúdo for recuperado por **id** deverá ser calculado a propriedade: **expired**

      A propriedade expired é verdadeira quando expires_at for menor que a data atual (ambos timestamp)

- [ ] Toda vez que um conteúdo for recuperado por **id** deverá ser informada a propriedade: **watched**

      A propriedade watched é verdadeira quando o conteúdo já tiver sido obtido alguma vez

- [ ] Caso um conteúdo já existente em memória tente ser criado com o mesmo **id** uma exceção deverá ser lançada

- [ ] Ao editar um conteúdo, o antigo deve ser sobrescrito com o que esta sendo enviado na requisição

      A propriedade watched deve ser false

### Dicas

- Os conteúdos podem ficar em memória, não é necessário persistir os dados
- Sinta-se a vontade para fazer o código em JS
- Caso tenha alguma dúvida, tome uma decisão e explique no PR
- Testes são sempre bem-vindos :smiley:
