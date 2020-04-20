'use strict'

const { create, findOne, update, remove } = require('../repository/medias')
const {
  checkProvidedId,
  defineExpired,
  definePayload,
  doesMediaExist
} = require('../../utils')

module.exports.selectMediaData = params => {
  const { id } = params

  const response = findOne(id)

  if (!response) {
    return null
  }

  const formatResponse = {
    ...response,
    expired: defineExpired(response)
  }

  update(id, { watched: true })

  return formatResponse
}

module.exports.createMediaData = payload => {
  checkProvidedId(payload.id)

  payload = definePayload(payload)
  return create(payload)
}

module.exports.updateMediaData = (params, payload) => {
  const { id } = params

  const mediaExists = doesMediaExist(id)
  if (!mediaExists) {
    return null
  }

  if (payload && payload.id) {
    checkProvidedId(payload.id, id)
  }

  payload = definePayload(payload)
  return update(id, payload)
}

module.exports.removeMediaData = params => {
  const { id } = params
  const mediaExists = doesMediaExist(id)

  return mediaExists
    ? remove(id)
    : null
}
