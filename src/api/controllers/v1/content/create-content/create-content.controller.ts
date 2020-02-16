import { Controller, Inject, Post, Body, Res } from '@nestjs/common';
import AbstractController from '../../../AbstractController';
import ContentDTO from '../../../../dtos/ContentDTO';

import { CreateContentService } from '../../../../services/content/create-content/create-content.service';
import { Response } from 'express';

@Controller('api/v1/content')
export class CreateContentController extends AbstractController<CreateContentService> {

    private service : CreateContentService

    constructor(@Inject(CreateContentService) service) {
        super()
        this.service = service
    }

    @Post("create")
    createContent(@Body() content : ContentDTO, @Res() response : Response) {
        return this.processRequest(this.service, content, response)
    }

    preExecutionCheck() {}
    posExecutionCheck() {}

    getSuccessCode() {
        return 201
    }

    getErrorCode() {
        return 422
    }
}
