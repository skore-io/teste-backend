'use strict'

const fs = require('fs')
const { DATABASE, DATABASE_ERR } = require('./fields')

module.exports.findOne = id => {
  const records = readAndFormatDatabaseData()
  return records.find(record => record.id === id) || null
}

module.exports.create = params => {
  const records = readAndFormatDatabaseData()
  records.push(params)
  formatAndWriteDataInDatabase(records)
  return params
}

module.exports.update = (id, params) => {
  const records = readAndFormatDatabaseData()
  const index = records.findIndex(record => record.id === id)
  records[index] = { ...records[index], ...params }
  formatAndWriteDataInDatabase(records)
  return records[index]
}

module.exports.remove = id => {
  const records = readAndFormatDatabaseData()
  const index = records.findIndex(record => record.id === id)
  records.splice(index, 1)
  formatAndWriteDataInDatabase(records)
  return id
}

function readAndFormatDatabaseData () {
  try {
    const records = fs.readFileSync(DATABASE, 'utf8')
    return JSON.parse(records)
  } catch (err) {
    throw DATABASE_ERR
  }
}

function formatAndWriteDataInDatabase (value) {
  try {
    fs.writeFileSync(DATABASE, JSON.stringify(value))
  } catch (err) {
    throw DATABASE_ERR
  }
}
