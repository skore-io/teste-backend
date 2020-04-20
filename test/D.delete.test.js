/* eslint-disable node/no-unpublished-require */
/* eslint-env mocha */
/* eslint no-debugger: off */

const { remove } = require('../src/controller/medias')
const { expect } = require('chai')

const valid = { params: { id: 500 } }
const validWithIdNonExistent = { params: { id: 5000 } }

describe('Media Test Suite | Delete', () => {
  it('Expect to delete a media', () => {
    const response = remove(valid)

    expect(typeof response).to.be.equal('number')
    expect(response).to.be.equal(500)
  })

  it('Expect to delete\'s response equal null once the mediaId provided does not exist',
    () => {
      const response = remove(validWithIdNonExistent)

      expect(typeof response).to.be.equal('object')
      expect(response).to.be.equal(null)
    })
})
