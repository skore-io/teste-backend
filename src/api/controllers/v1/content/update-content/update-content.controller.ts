import { Controller, Post, Body, Inject, Res } from '@nestjs/common';
import AbstractController from '../../../AbstractController';
import { UpdateContentService } from '../../../../services/content/update-content/update-content.service';
import ContentDTO from '../../../../dtos/ContentDTO';
import { Response } from 'express';

@Controller('api/v1/content/')
export class UpdateContentController extends AbstractController<UpdateContentService> {

    private service : UpdateContentService

    constructor(@Inject(UpdateContentService) service) {
        super()
        this.service = service
    }

    @Post("update")
    createContent(@Body() content : ContentDTO, @Res() response : Response) {
        return this.processRequest(this.service, content, response)
    }

    preExecutionCheck() {}
    posExecutionCheck() {}

    getSuccessCode() {
        return 200
    }

    getErrorCode() {
        return 422
    }
}
