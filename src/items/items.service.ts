import { Injectable, BadRequestException } from '@nestjs/common';
import { CreateItemDto } from './dto/createItem.dto';
import { UpdateItemDto } from './dto/updateItem.dto';

@Injectable()

export class ItemsService {

    private lastId          = 0;
    private items           = [];

    createItem(item: CreateItemDto) {
        const checkItem          = this.items.findIndex(i => i.id === item.id);
        if ( checkItem == -1 ) {
            item.watched = false;
            this.items.push(item);
            return item;
        } else throw new BadRequestException('This id already exists');
    }

    getOneItem(id: number) {
        const item          = this.items.find(i => i.id === id);
        if ( item ) {
            let itemIndex           = this.items.findIndex(i => i.id === id);
            let myItem              = item;
            item.watched            = true;
            this.items[itemIndex]   = item;
            return myItem;
        } else throw new BadRequestException('No one item found');
    }

    updateItem(id: number, item: UpdateItemDto) {
        let itemIndex           = this.items.findIndex(i => i.id === id);
        if ( itemIndex > -1 ) {
            item.watched            = false;
            this.items[itemIndex]   = item;
            return item;
        } else throw new BadRequestException('No one item found');
    }

    deleteItem(id: number) {
        let itemIndex           = this.items.findIndex(i => i.id === id);
        if ( itemIndex > -1 ) {
            const del = delete this.items[itemIndex];
            return del ? {success:true} : {success:false};
        } else throw new BadRequestException('No one item found to delete');
    }

}