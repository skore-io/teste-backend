'use strict'

const {
  SelectMedia,
  CreateMedia,
  UpdateMedia,
  DeleteMedia
} = require('../schemas')

const {
  selectHandler,
  createHandler,
  updateHandler,
  removeHandler
} = require('./default-handler')

module.exports.medias = [
  {
    method: 'GET',
    path: '/medias/{id}',
    config: {
      handler: selectHandler,
      description: 'Query a specific media by id',
      notes: 'Returns 200 with the chosen media',
      tags: [ 'api', 'media' ],
      validate: SelectMedia
    }
  },
  {
    method: 'POST',
    path: '/medias',
    config: {
      handler: createHandler,
      description: 'Create a media',
      notes: 'Returns 200 with the created media',
      tags: [ 'api', 'media' ],
      validate: CreateMedia
    }
  },
  {
    method: 'PUT',
    path: '/medias/{id}',
    config: {
      handler: updateHandler,
      description: 'Update a specific media by id',
      notes: 'Returns 200 with the updated media',
      tags: [ 'api', 'media' ],
      validate: UpdateMedia
    }
  },
  {
    method: 'DELETE',
    path: '/medias/{id}',
    config: {
      handler: removeHandler,
      description: 'Delete a specific media by id',
      notes: 'Returns 200 with the deleted media id',
      tags: [ 'api', 'media' ],
      validate: DeleteMedia
    }
  }
]
