import { Injectable, BadRequestException  } from '@nestjs/common';
import { CreateItemDto } from './dto/createItem.dto';
import { UpdateItemDto } from './dto/updateItem.dto';

@Injectable()

export class ItemsService {

    private lastId          = 0;
    private items           = [];

    createItem(data: CreateItemDto) {
        const checkItem          = this.items.findIndex(i => i.id === data.id);
        if ( checkItem == -1 ) {
            data.watched = false;
            this.items.push(data);
            return data;
        } else throw new BadRequestException('This id already exists');
    }

    getOneItem(id: number) {
        const item              = this.findOne(id);
        const uItem             = item.response;
        uItem.watched           = true;
        if( new Date().getTime() > new Date(uItem.expire_at).getTime() ) {
            uItem.expired = true;
        } else {
            uItem.expired = false;
        }
        this.items[item.index]  = uItem;
        return item.response;
    }

    updateItem(id: number, data: UpdateItemDto) {
        const item              = this.findOne(id);
        data.watched            = false;
        this.items[item.index]  = data;
        return data;
    }

    deleteOneItem(id: number) {
        const item = this.findOne(id);
        return this.items.splice(item.index, 1) ? {success:true} : {success:false};
    }

    findOne(id: number) {
        let itemIndex           = this.items.findIndex(i => i.id === id);
        if ( itemIndex > -1 ) {
            return {index: itemIndex, response: this.items[itemIndex]};
        } else throw new BadRequestException('No one item found');
    }

}