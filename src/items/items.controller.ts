import { Controller, Put, Get, Post, Delete, Param, Body, BadRequestException } from '@nestjs/common';
import { ItemsService }  from './items.service';
import { CreateItemDto } from './dto/createItem.dto';
import { UpdateItemDto } from './dto/updateItem.dto';

@Controller('items')
export class ItemsController {

    constructor(private readonly itemsService: ItemsService) {}

    // [PUT]
    // INSERT A NEW ITEM
    // @body => Json
    @Put()
    create(@Body() item: CreateItemDto) {
        try {
            return this.itemsService.createItem(item);
        } catch (e) {
            throw new BadRequestException(e.message);
        }
    }

    // [GET]
    // READ A ITEM
    // @id => Integer
    @Get(':id')
    getOne(@Param('id') id: number) {
        try {
            return this.itemsService.getOneItem(Number(id))
        } catch (e) {
            throw new BadRequestException(e.message);
        }
    }

    // [POST]
    // EDIT A ITEM
    // @id => Integer
    // @body => Json
    @Post(':id')
    createOne(@Param('id') id: number, @Body() item: UpdateItemDto) {
        try {
            return this.itemsService.updateItem(Number(id), item)
        } catch(e) {
            throw new BadRequestException(e.message);
        }
    }

    // [DELETE]
    // REMOVE A ITEM
    // @id => Integer
    @Delete(':id')
    deleteOne(@Param('id') id: number) {
        try {
            return this.itemsService.deleteOneItem(Number(id))
        } catch(e) {
            throw new BadRequestException(e.message);
        }
    }

}