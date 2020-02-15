import { Injectable } from '@nestjs/common';
import Content from 'src/models/ContentInterface';
import ContentDTO from 'src/dto/ContentDTO';

@Injectable()
export class FakeDbService {

    data: Array<Content>;

    constructor() {
        this.data = []   
    }

    persist(contentDTO : ContentDTO) : Content {
        if(this.existsObject(contentDTO.id)) throw "Id inválido"

        const contentToPersist = {...contentDTO, watched: false, expired: false }

        this.data.push(contentToPersist)
        return contentToPersist
    }

    merge(contentDTO : ContentDTO) : Content {
        if (!this.existsObject(contentDTO.id)) throw "Objeto inválido para atualização"

        const existedContent = this.data.find(content => content.id === contentDTO.id)

        Object.keys(contentDTO).forEach(key => existedContent[key] = contentDTO[key])
        return existedContent
    }

    delete(id : number) : string {
        if(!this.existsObject(id)) throw "Objeto inválido para remoção"
    
        this.data = this.data.filter(content => content.id !== id)
        return "Objeto removido com sucesso."
    } 

    list() : Array<Content> {
        return this.data
    }

    private existsObject(id : number) : boolean {
        return !! this.data.find(content => content.id === id)
    }
}
