import { Injectable } from '@nestjs/common';
import Content from 'src/db/models/ContentInterface';
import ContentDTO from '../../api/dtos/ContentDTO';

@Injectable()
class FakeDbService {

    data: Array<Content>;

    constructor() {
        this.data = []   
    }

    persist(content : Content) : void {
        if(this.existsObject(content.id)) throw "Id inválido"
        this.data.push(content)
    }

    merge(content : Content) : Content {
        if (!this.existsObject(content.id)) throw "Objeto inválido para atualização"
        return content
    }

    delete(id : number) : string {
        if(!this.existsObject(id)) throw "Objeto inválido para remoção"
    
        this.data = this.data.filter(content => content.id !== id)
        return "Objeto removido com sucesso."
    } 

    findBy(id : Number) : Content {
        const existedContent = this.data.find(content => content.id === id)

        if(existedContent) return existedContent
        
        throw "Objeto não existe."
    }

    private existsObject(id : number) : boolean {
        return !! this.data.find(content => content.id === id)
    }
}

export default FakeDbService