import { Controller, Inject, Res, Param, Get } from '@nestjs/common';
import { Response } from 'express';

import AbstractController from '../../../AbstractController';
import { GetContentService } from '../../../../services/content/get-content/get-content.service';

@Controller("api/v1/content")
export class GetContentController extends AbstractController<GetContentService> {

    private service : GetContentService

    constructor(@Inject(GetContentService) service) {
        super()
        this.service = service
    }

    @Get(":id")
    createContent(@Param('id') id: string, @Res() response : Response) {
        return this.processRequest(this.service, Number(id), response)
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
