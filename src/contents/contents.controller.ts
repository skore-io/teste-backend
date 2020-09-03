import { Controller, Get, Param, Body, Post, Put, Delete } from '@nestjs/common';
import { ContentsService } from './contents.service';
import { Content } from 'src/content';

@Controller('contents')
export class ContentsController {
    constructor(private contentService: ContentsService) {}

    @Get()
    async getAll(): Promise<Content[]> {
        return this.contentService.getAll();
    }

    @Get(':id')
    async getById(@Param('id') id: number): Promise<Content> {
        return this.contentService.getById(id);
    }

    @Post()
    async create(@Body() content: Content): Promise<Content> {
        return this.contentService.create(content);
    }

    @Put()
    async update(@Body() content: Content): Promise<Content> {
        return this.contentService.update(content);
    }

    @Delete(':id')
    async delete(@Param('id') id:number) {
        this.contentService.delete(id);
    }
}
