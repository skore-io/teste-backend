'use strict'

const { findOne } = require('./src/repository/medias')
const REGEX = /^\/(.+)\/.+/i

module.exports.checkProvidedId = (id, mediaCurrentId) => {
  const media = findOne(id)

  if (!media || mediaCurrentId && media.id === mediaCurrentId) {
    return
  }

  throw new Error('Already exists a media with the id provided')
}

module.exports.defineExpired = response =>
  response && response.expires_at < new Date().valueOf()

module.exports.defineEntity = request => request &&
    request.route &&
    request.path &&
    request.route.path.replace(REGEX, '$1') ||
    null

module.exports.definePayload = payload => ({
  ...payload,
  watched: false
})

module.exports.doesMediaExist = id =>
  !!findOne(id)

module.exports.formatErr = err => ({
  status: false,
  message: err && err.message || err
})

module.exports.formatResponse = result => ({
  status: true,
  result
})
