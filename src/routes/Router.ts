import MediaController from '../controllers/MediaController';

export default class Router {

    private BASE_URL: string = "/api/v1";
    private CREATE_MEDIA: string = this.BASE_URL + "/media";
    private GET_ID: string = this.BASE_URL + "/media/:id";
    private DELETE_MEDIA: string = this.BASE_URL + "/media/delete/:id";
    private UPDATE_MEDIA: string = this.BASE_URL + "/media/update/:id"

    public startWith(app){

        app.route(this.CREATE_MEDIA).post(MediaController.saveMedia)
        app.route(this.GET_ID).get(MediaController.getMedias)
        app.route(this.DELETE_MEDIA).delete(MediaController.deleteMedia)
        app.route(this.UPDATE_MEDIA).patch(MediaController.updateMedia)

    }
}