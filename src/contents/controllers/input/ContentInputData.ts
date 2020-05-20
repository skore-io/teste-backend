import { Content } from '../../models/content';

export class ContentInputData {
  public id: number;
  public name: string;
  public duration: number;
  public provider: string;
  public media_type: string;
  public provider_id: string;
  public expires_at: number;

  public getContent() {
    return new Content(
      this.id,
      this.name,
      this.duration,
      this.provider,
      this.media_type,
      this.provider_id,
      this.expires_at,
    );
  }

  isValid() {
    return (
      [
        'id',
        'name',
        'duration',
        'provider',
        'media_type',
        'provider_id',
        'expires_at',
      ].filter(attribute => this[attribute] != undefined && this[attribute])
        .length == 7
    );
  }
}
