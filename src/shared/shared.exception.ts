import { HttpException, HttpStatus } from "@nestjs/common"

export class SharedException extends HttpException {

    constructor(message?: string) {
        console.log('SharedException: ' + message)
        super(message ? message : 'Unexpected Error!', HttpStatus.BAD_REQUEST)
    }
    
}