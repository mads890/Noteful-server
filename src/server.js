const app = require('./app')
const { PORT, DATABASE_URL } = require('./config')
const knex = require('knex')

const db = knex({
    client: 'pg',
    connection: DATABASE_URL,
})

app.set('db', db)

port = PORT || 8000

app.listen(port, () => {
    console.log(`listening on ${port}`)
})