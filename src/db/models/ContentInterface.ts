export default interface Content {
    id: number,
    name: string,
    duration: number,
    provider: string,
    media_type: string,
    provider_id: string,
    expires_at: number,
    watched: boolean,
    expired: boolean
}