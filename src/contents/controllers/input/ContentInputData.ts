import { Content } from "../../models/content";

export class ContentInputData {
  constructor(
    private id: number,
    private name: string,
    private duration: number,
    private provider: string,
    private media_type: string,
    private provider_id: string,
    private expires_at: number){}

    public getContent(){
      return new Content(
        this.id,
        this.name,
        this.duration,
        this.provider,
        this.media_type,
        this.provider_id,
        this.expires_at)
    }
};
