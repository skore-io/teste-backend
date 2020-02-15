import AbstractService from "src/services/AbstractService";
import { Request, Response } from 'express';

export default abstract class AbstractController<Service extends AbstractService> {

    abstract preExecutionCheck(requestDTO : Request) : void
    abstract posExecutionCheck(responseDTO : any) : void
    abstract getSuccessCode() : number
    abstract getErrorCode() : number

    processRequest(service : Service, requestDTO : any, response : Response) : Response {
        let responseDTO = {}

        try {
            this.preExecutionCheck(requestDTO);
            responseDTO = service.processData(requestDTO)
            this.posExecutionCheck(responseDTO);
        } catch (e) {
            return response.status(this.getErrorCode()).json(this.buildErrorResponse(e))
        }

        return response.status(this.getSuccessCode()).json(responseDTO)
    }

    buildErrorResponse(e) : any {
        return { error: e }
    }
}
