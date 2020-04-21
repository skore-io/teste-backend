export class Response {

    error: boolean;
    message: string;
    data: any;

    constructor(error: boolean, message: string, data: any) {
        this.error = error;
        this.message = message;
        this.data = data;
    }
}