import * as mongoose from 'mongoose'

export const VideoSchema = new mongoose.Schema({
    _id: { type: Number, required: true },
    name: { type: String, required: true },
    duration: { type: Number, required: true },
    provider: { type: String, required: true },
    media_type: { type: String, required: true },
    provider_id: { type: String, required: true },
    expires_at: { type: Date, required: true },
    watched: { type: Boolean, default: false },
    expired: { type: Boolean, default: false },
});

// hide watched and expired from payload?
// VideoSchema.methods.toJSON = function () {
//     let obj = this.toObject();
//     delete obj.watched;
//     delete obj.expired;
//     return obj;
// }