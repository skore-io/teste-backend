/* eslint-disable node/no-unpublished-require */
/* eslint-env mocha */
/* eslint no-debugger: off */

const { create } = require('../src/controller/medias')
const { expect } = require('chai')
const { valid, invalid } = require('./mocks/create')

describe('Media Test Suite | Create', () => {
  it('Expect to create a media successfully', () => {
    const response = create(valid)

    expect(typeof response).to.be.equal('object')
    expect(response.id).to.be.equal(valid.payload.id)
    expect(response.name).to.be.equal(valid.payload.name)
    expect(response.duration).to.be.equal(valid.payload.duration)
    expect(response.provider).to.be.equal(valid.payload.provider)
    expect(response.media_type).to.be.equal(valid.payload.media_type)
    expect(response.provider_id).to.be.equal(valid.payload.provider_id)
    expect(response.expires_at).to.be.equal(valid.payload.expires_at)
    expect(typeof response.watched).to.be.equal('boolean')
    expect(response.watched).to.be.equal(false)
  })

  it('Expect error when creating a media once media id already exits', () => {
    try {
      const response = create(invalid)
      expect(response).to.be.equal(undefined)
    } catch (err) {
      expect(typeof err).to.be.equal('object')
      expect(typeof err.message).to.be.equal('string')
      expect(err.message).to.contain('Already exists a media with the id provided')
    }
  })
})
