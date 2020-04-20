/* eslint-disable node/no-unpublished-require */
/* eslint-env mocha */
/* eslint no-debugger: off */

const { show } = require('../src/controller/medias')
const { expect } = require('chai')

const valid = { params: { id: 500 } }
const validWithIdNonExistent = { params: { id: 5000 } }

describe('Media Test Suite | Select', () => {
  it('Expect to select a media that has not been seen successfully', () => {
    const response = show(valid)

    expect(typeof response).to.be.equal('object')
    expect(response).to.has.property('id')
    expect(typeof response.id).to.be.equal('number')
    expect(response).to.has.property('name')
    expect(typeof response.name).to.be.equal('string')
    expect(response).to.has.property('duration')
    expect(typeof response.duration).to.be.equal('number')
    expect(response).to.has.property('provider')
    expect(typeof response.provider).to.be.equal('string')
    expect(response).to.has.property('media_type')
    expect(typeof response.media_type).to.be.equal('string')
    expect(response).to.has.property('provider_id')
    expect(typeof response.provider_id).to.be.equal('string')
    expect(response).to.has.property('expires_at')
    expect(typeof response.expires_at).to.be.equal('number')
    expect(response).to.has.property('watched')
    expect(typeof response.watched).to.be.equal('boolean')
    expect(response.watched).to.be.equal(false)
    expect(response).to.has.property('expired')
    expect(typeof response.expired).to.be.equal('boolean')
    expect(response.expired).to.be.equal(true)
  })

  it('Expect to select\'s response equal null once the mediaId provided does not exist',
    () => {
      const response = show(validWithIdNonExistent)

      expect(typeof response).to.be.equal('object')
      expect(response).to.be.equal(null)
    })

  it('Expect to select a media that has already been seen successfully', () => {
    const response = show(valid)

    expect(typeof response).to.be.equal('object')
    expect(response).to.has.property('watched')
    expect(typeof response.watched).to.be.equal('boolean')
    expect(response.watched).to.be.equal(true)
    expect(typeof response.expired).to.be.equal('boolean')
  })
})
