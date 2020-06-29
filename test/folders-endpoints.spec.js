const knex = require('knex')
const app = require('../src/app')
const { makeFoldersArray } = require('./folders-fixtures')

describe('folders endpoints', () => {
    let db
    before('make knex instance', () => {
        db = knex({
            client: 'pg',
            connection: process.env.TEST_DB_URL,
        })
        app.set({ db })
    })

    after('disconnect from db', () => {
        db.destroy()
    })

    
})