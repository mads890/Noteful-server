require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const helmet = require('helmet')
const { NODE_ENV } = require('./config')
const errorHandler = require('./error-handler')
const foldersRouter = require('./folders/folder-router')
const notesRouter = require('./notes/note-router')
const validateBearerToken = require('./validate-bearer-token')

const app = express()

const morganUse = (NODE_ENV === 'production' ? 'tiny' : 'common')

app.use(morgan(morganUse))
app.use(helmet())
app.use(cors())
app.use(validateBearerToken)

app.use('/api/folders', foldersRouter)
app.use('/api/notes', notesRouter)

app.use(errorHandler)

module.exports = app