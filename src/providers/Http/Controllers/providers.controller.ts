import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common'
import { ProvidersService } from '../../Domain/Services/providers.service'
import { Providers } from '../../Domain/Models/ObjectLists/providers'
import { Provider } from '../../Domain/Models/provider'

@Controller('providers')
export class ProvidersController {
  constructor(private readonly service: ProvidersService) {}

  @Get()
  async findAll(): Promise<Providers> {
    return this.service.findAll()
  }

  @Get(':id')
  async find(@Param('id') providerId: string): Promise<Provider> {
    return this.service.find(providerId)
  }

  @Post()
  async create(@Body('provider') provider: Provider): Promise<Provider> {
    return this.service.create(provider)
  }

  @Put()
  async update(@Body('provider') provider: Provider): Promise<Provider> {
    try {
      return this.service.update(provider)
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.UNPROCESSABLE_ENTITY)
    }
  }

  @Delete(':id')
  async delete(@Param('id') providerId: string): Promise<Provider> {
    try {
      return this.service.delete(providerId)
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.UNPROCESSABLE_ENTITY)
    }
  }
}
