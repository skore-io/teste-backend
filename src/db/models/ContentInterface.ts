export default interface Content {
    id: number,
    name: string,
    duration: number,
    provider: string,
    mediaType: string,
    providerId: string,
    expiresAt: number,
    watched: boolean,
    expired: boolean
}