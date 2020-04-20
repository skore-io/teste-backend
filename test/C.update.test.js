/* eslint-disable node/no-unpublished-require */
/* eslint-env mocha */
/* eslint no-debugger: off */

const { update } = require('../src/controller/medias')
const { expect } = require('chai')
const { valid, validWithIdNonExistent, invalid } = require('./mocks/update')

describe('Media Test Suite | Update', () => {
  it('Expect to update a media successfully', () => {
    const response = update(valid)

    expect(typeof response).to.be.equal('object')
    expect(response.id).to.be.equal(valid.payload.id)
    expect(response.name).to.be.equal(valid.payload.name)
    expect(response.duration).to.be.equal(valid.payload.duration)
    expect(response.expires_at).to.be.equal(valid.payload.expires_at)
    expect(typeof response.watched).to.be.equal('boolean')
    expect(response.watched).to.be.equal(false)
  })

  it('Expect to update\'s response equal null once the mediaId provided does not exist',
    () => {
      const response = update(validWithIdNonExistent)

      expect(typeof response).to.be.equal('object')
      expect(response).to.be.equal(null)
    })

  it('Expect error when updating a media once media id already exits', () => {
    try {
      const response = update(invalid)
      expect(response).to.be.equal(undefined)
    } catch (err) {
      expect(typeof err).to.be.equal('object')
      expect(typeof err.message).to.be.equal('string')
      expect(err.message).to.contain('Already exists a media with the id provided')
    }
  })
})
