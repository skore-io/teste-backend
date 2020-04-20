'use strict'

const Joi = require('@hapi/joi')

module.exports.SelectMedia = {
  params: Joi.object({
    id: Joi.number()
      .min(1)
      .label('id')
      .required()
      .description('The id of a media')
  })
}

module.exports.CreateMedia = {
  payload: Joi.object({
    id: Joi.number()
      .min(1)
      .label('id')
      .required()
      .description('The id of a media'),

    name: Joi.string()
      .trim()
      .replace(/\s{2,}/g, ' ')
      .label('name')
      .required()
      .description('The name of a media'),

    duration: Joi.number()
      .label('duration')
      .required()
      .description('The duration of a media'),

    provider: Joi.string()
      .trim()
      .replace(/\s{2,}/g, ' ')
      .label('provider')
      .required()
      .description('The provider of a media'),

    provider_id: Joi.string()
      .trim()
      .replace(/\s{2,}/g, ' ')
      .label('provider_id')
      .required()
      .description('The provider id of a media'),

    media_type: Joi.string()
      .trim()
      .replace(/\s{2,}/g, ' ')
      .label('media_type')
      .required()
      .description('The type of a media'),

    expires_at: Joi.date()
      .timestamp()
      .raw()
      .label('expires_at')
      .required()
      .description('The expires timestamp of a media')
  })
}

module.exports.UpdateMedia = {
  params: Joi.object({
    id: Joi.number()
      .min(1)
      .label('id')
      .required()
      .description('The id of a media')
  }),

  payload: Joi.object({
    id: Joi.number()
      .min(1)
      .label('id')
      .optional()
      .description('The id of a media'),

    name: Joi.string()
      .trim()
      .replace(/\s{2,}/g, ' ')
      .label('name')
      .optional()
      .description('The name of a media'),

    duration: Joi.number()
      .label('duration')
      .optional()
      .description('The duration of a media'),

    provider: Joi.string()
      .trim()
      .replace(/\s{2,}/g, ' ')
      .label('provider')
      .optional()
      .description('The provider of a media'),

    provider_id: Joi.string()
      .trim()
      .replace(/\s{2,}/g, ' ')
      .label('provider_id')
      .optional()
      .description('The provider id of a media'),

    media_type: Joi.string()
      .trim()
      .replace(/\s{2,}/g, ' ')
      .label('media_type')
      .optional()
      .description('The type of a media'),

    expires_at: Joi.date()
      .timestamp()
      .raw()
      .label('expires_at')
      .optional()
      .description('The expires timestamp of a media')
  })
}

module.exports.DeleteMedia = {
  params: Joi.object({
    id: Joi.number()
      .min(1)
      .label('id')
      .required()
      .description('The id of a media')
  })
}
