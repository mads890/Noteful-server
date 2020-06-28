const app = require('./app')
let { PORT } = require('./config')

port = process.env.PORT || 8000

app.listen(port, () => {
    console.log(`listening on ${PORT}`)
})