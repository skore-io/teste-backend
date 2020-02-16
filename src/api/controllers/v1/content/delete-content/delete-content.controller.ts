import { Controller, Delete, Inject, Res, Param } from '@nestjs/common';
import AbstractController from '../../../AbstractController';
import { DeleteContentService } from '../../../../services/content/delete-content/delete-content.service';
import { Response } from 'express';

@Controller('api/v1/content')
export class DeleteContentController extends AbstractController<DeleteContentService> {

    private service : DeleteContentService

    constructor(@Inject(DeleteContentService) service) {
        super()
        this.service = service
    }

    @Delete("delete/:id")
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
