import { Request } from 'express';

abstract class AbstractService {

    abstract processData(requestDTO: Request): any;
}

export default AbstractService