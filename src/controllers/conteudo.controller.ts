import { Controller, Get, Param, Body, Post, Put, Delete, HttpStatus, HttpException, UseInterceptors } from "@nestjs/common";
import { Conteudo } from "src/models/conteudo.model";
import { ConteudoService } from 'src/services/conteudo.service';

 
@Controller('v1/conteudos')
export class ConteudoController {

    constructor(private readonly service: ConteudoService) { }
 
    @Get()
        getAll() {
            try {
                const conteudos = this.service.getAll();
                return {
                    message: 'conteudos obtidos com sucesso',
                    success: true,
                    error: null,
                    data: conteudos,
                };
            } catch (error) {
                throw new HttpException(
                {
                    message: 'erro na obtenção dos conteudos',
                    success: false,
                    error,
                    data: null,
                },
                HttpStatus.BAD_REQUEST,
                );
            }
        }
    
    @Get(':id')
        get(@Param('id') id: number) {
            try {
                const conteudo = this.service.get(id);
                return {
                    message: 'conteudo obtido com sucesso',
                    success: true,
                    error: null,
                    data: conteudo,
                };
            } catch (error) {
                throw new HttpException(
                {
                    message: 'erro na obtenção do conteudo',
                    success: false,
                    error,
                    data: null,
                },
                HttpStatus.BAD_REQUEST,
                );
            }
        }
    
    @Post()
        post(@Body() model: Conteudo) {
            try {
                const response = this.service.create(model);
                return {
                    message: 'conteudo cadastrado com sucesso',
                    success: true,
                    error: null,
                    data: response,
                };
            } catch (error) {
                throw new HttpException(
                {
                    message: 'erro ao cadastrar o conteudo',
                    success: false,
                    error,
                    data: null,
                },
                HttpStatus.BAD_REQUEST,
                );
            }
        }
    
    @Put(':id')
        put(@Param('id') id, @Body() model: Conteudo) {
            try {
                const response = this.service.update(id, model);
                return {
                message: 'conteudo atualizado com sucesso',
                success: true,
                error: null,
                data: response,
                };
            } catch (error) {
                throw new HttpException(
                {
                    message: 'erro ao atualizar o conteudo',
                    success: false,
                    error,
                    data: null,
                },
                HttpStatus.BAD_REQUEST,
                );
            }
        }
    
    @Delete(':id')
        delete(@Param('id') id) {
            try {
                const response = this.service.remove(id);
                return {
                    message: 'conteudo removido com sucesso',
                    success: true,
                    error: null,
                    data: response,
                };
            } catch (error) {
                throw new HttpException(
                {
                    message: 'erro ao deletar o conteudo',
                    success: false,
                    error,
                    data: null,
                },
                HttpStatus.BAD_REQUEST,
                );
            }
        }
}