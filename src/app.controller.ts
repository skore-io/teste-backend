import { Controller, Get,Req, Post,Param,Put, Delete, HttpException, HttpStatus } from '@nestjs/common';
import { AppService } from './app.service';
import { Request } from 'express';

@Controller('content')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('add')
  createContent(@Req() request: Request): any[] {
    return this.appService.createContent(request.body);
  }

  @Get(':id')
  getContentById(@Param('id') id): Object {
    return this.appService.getContentById(id);
  }

  @Put(':id')
  setContentById(@Param('id') id,@Req() request: Request): Number {
    return this.appService.setContentById(id,request.body);
  }

  @Delete(':id')
  removeById(@Param('id') id): any[]  {
    return this.appService.removeContentById(id);
  }
  
}
