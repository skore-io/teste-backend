'use strict'

module.exports = {
  valid: {
    params: {
      id: 500
    },

    payload: {
      'id': 500,
      'name': 'The Node.js Event Loop: Not So Single Threaded - UPDATE',
      'duration': 1800,
      'expires_at': 1607716800000
    }
  },

  validWithIdNonExistent: {
    params: {
      id: 5000
    },

    payload: {
      'id': 500,
      'name': 'The Node.js Event Loop: Not So Single Threaded - UPDATE',
      'duration': 1800,
      'expires_at': 1607716800000
    }
  },

  invalid: {
    params: {
      id: 500
    },

    payload: {
      'id': 1,
      'name': 'Invalid id for update',
      'duration': 1860,
      'provider': 'youtube',
      'media_type': 'video',
      'provider_id': 'STKCRSUsyP0',
      'expires_at': 1580428851394
    }
  }
}
