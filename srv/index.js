'use-strict'

const inert = require('@hapi/inert')
const vision = require('@hapi/vision')

const Hapi = require('@hapi/hapi')
const HapiSwagger = require('hapi-swagger')

const { medias } = require('../routes')

async function main () {
  try {
    const server = new Hapi.Server({ host: 'localhost', port: 3000 })

    await server.register([
      inert,
      vision,
      {
        plugin: HapiSwagger,
        options: {
          info: {
            title: 'API - Media Saver',
            version: '1.0.0'
          }
        }
      }
    ])

    server.route([ ...medias ])
    await server.start()

    console.log('Server running on: 3000')
  } catch (err) {
    console.error('An error has occurred', err)
  }
}

main()
