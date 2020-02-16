import { Controller, Inject, Res, Param, Get } from '@nestjs/common';
import { Response } from 'express';

import AbstractController from '../../../AbstractController';
import { ListContentService } from '../../../../services/content/list-content/list-content.service';

@Controller("api/v1/content")
export class ListContentController extends AbstractController<ListContentService> {

    private service : ListContentService

    constructor(@Inject(ListContentService) service) {
        super()
        this.service = service
    }

    @Get()
    createContent(@Res() response : Response) {
        return this.processRequest(this.service, {}, response)
    }

    preExecutionCheck() {}
    posExecutionCheck() {}

    getSuccessCode() {
        return 200
    }

    getErrorCode() {
        return 500
    }
}
