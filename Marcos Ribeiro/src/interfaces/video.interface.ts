export interface Video extends Document {
    _id: number
    name: String
    duration: number
    provider: string
    media_type: string
    provider_id: string
    watched: boolean
    expired: boolean 

    // timestamp
    expires_at: Date
}
