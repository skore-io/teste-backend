'use strict'

module.exports = {
  valid: {
    payload: {
      'id': 500,
      'name': 'The Node.js Event Loop: Not So Single Threaded',
      'duration': 1860,
      'provider': 'youtube',
      'media_type': 'video',
      'provider_id': 'STKCRSUsyP0',
      'expires_at': 1580428851394
    }
  },

  invalid: {
    payload: {
      'id': 500,
      'name': 'Same id as the media above',
      'duration': 1860,
      'provider': 'youtube',
      'media_type': 'video',
      'provider_id': 'STKCRSUsyP0',
      'expires_at': 1580428851394
    }
  }
}
