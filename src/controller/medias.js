'use strict'

const {
  selectMediaData,
  createMediaData,
  updateMediaData,
  removeMediaData
} = require('../model/medias')

module.exports.show = request => {
  const { params } = request
  return selectMediaData(params)
}

module.exports.create = request => {
  const { payload } = request
  return createMediaData(payload)
}

module.exports.update = request => {
  const { params, payload } = request
  return updateMediaData(params, payload)
}

module.exports.remove = request => {
  const { params } = request
  return removeMediaData(params)
}
