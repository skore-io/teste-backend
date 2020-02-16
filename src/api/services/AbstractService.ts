import FakeDbService from "../../db/fake-db/fake-db.service"

abstract class AbstractService {

    protected db : FakeDbService

    constructor(db : FakeDbService) {
        this.db = db
    }

    abstract process(contentDTO: any): any;
}

export default AbstractService