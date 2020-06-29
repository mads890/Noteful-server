const knex = require('knex')
const app = require('../src/app')
const { makeNotesArray } = require('./notes-fixtures')

describe('notes endpoints', () => {
    let db
    before('make knexInstance', () => {
        db = knex({
            client: 'pg',
            connection: process.env.TEST_DB_URL,
        })
        app.set({ db })
    })

    after('disconnect from db', () => {
        db.destroy()
    })

    before('')
})