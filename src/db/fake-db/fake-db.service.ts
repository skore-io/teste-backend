import { Injectable } from '@nestjs/common';
import Content from 'src/db/models/ContentInterface';
import { OBJECT_NOT_EXISTS, DELETE_OK, INVALID_ID } from '../../messages/messages'

@Injectable()
class FakeDbService {

    data: Array<Content>;

    constructor() {
        this.data = []   
    }

    persist(content : Content) : void {
        if(this.existsObject(content.id)) throw INVALID_ID
        this.data.push(content)
    }

    merge(content : Content) : Content {
        return content
    }

    delete(content : Content) : string {
        this.data = this.data.filter(c => c.id !== content.id)
        return DELETE_OK
    } 

    findBy(id : Number) : Content {
        const existedContent = this.data.find(content => content.id === id)

        if(existedContent) return existedContent
        
        throw OBJECT_NOT_EXISTS
    }

    private existsObject(id : number) : boolean {
        return !! this.data.find(content => content.id === id)
    }
}

export default FakeDbService