export declare class VideoEntity {
    id: number;
    name: string;
    duration: number;
    provider: string;
    media_type: string;
    provider_id: string;
    expires_at: number;
    watched?: boolean;
    get expired(): boolean;
    constructor(partial: Partial<VideoEntity>);
}
