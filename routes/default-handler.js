'use strict'

const {
  defineEntity,
  formatErr,
  formatResponse
} = require('../utils')

module.exports.selectHandler = (request, reply) => {
  const entity = defineEntity(request)
  const { show } = require(`../src/controller/${entity}`)

  try {
    const result = show(request)
    const response = formatResponse(result)

    return reply.response(response)
      .code(200)
  } catch (err) {
    const response = formatErr(err)

    return reply.response(response)
      .code(400)
  }
}

module.exports.createHandler = (request, reply) => {
  const entity = defineEntity(request)
  const { create } = require(`../src/controller/${entity}`)

  try {
    const result = create(request)
    const response = formatResponse(result)

    return reply.response(response)
      .code(200)
  } catch (err) {
    const response = formatErr(err)

    return reply.response(response)
      .code(400)
  }
}

module.exports.updateHandler = (request, reply) => {
  const entity = defineEntity(request)
  const { update } = require(`../src/controller/${entity}`)

  try {
    const result = update(request)
    const response = formatResponse(result)

    return reply.response(response)
      .code(200)
  } catch (err) {
    const response = formatErr(err)

    return reply.response(response)
      .code(400)
  }
}

module.exports.removeHandler = (request, reply) => {
  const entity = defineEntity(request)
  const { remove } = require(`../src/controller/${entity}`)

  try {
    const result = remove(request)
    const response = formatResponse(result)

    return reply.response(response)
      .code(200)
  } catch (err) {
    const response = formatErr(err)

    return reply.response(response)
      .code(400)
  }
}
