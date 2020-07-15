const express = require('express')
const xss = require('xss')
const logger = require('../logger')
const NotesService = require('./note-service')

const notesRouter = express.Router()
const jsonParser = express.json()

const serializeNote = note => ({
    id: note.id,
    title: xss(note.title),
    content: xss(note.content),
    modified: note.modified,
    folder_id: note.folder_id
})

notesRouter
    .route('/')
    .get((req, res, next) => {
        NotesService.getAllNotes(req.app.get('db'))
            .then(notes => {
                return res.json(notes.map(note => serializeNote(note)))
            })
            .catch(next)
    })
    .post(jsonParser, (req, res, next) => {
        const { title, content, folder_id } = req.body
        const newNote = { title, content, folder_id }
        for(const [key, value] of Object.entries(newNote)) {
            if (value == null) {
                return res.status(400).json({
                    error: { message: `missing ${key} in req body`}
                })
            }
        }
        NotesService.insertNote(req.app.get('db'), newNote)
            .then(note => {
                logger.info(`note with id ${note.id} created`)
                res.status(201).location(`http://localhost:8000/api/notes/${note.id}`).json(serializeNote(note))
            })
            .catch(next)
    })

notesRouter
    .route('/:note_id')
    .all((req, res, next) => {
        NotesService.getNoteById(req.app.get('db'), parseInt(req.params.note_id))
            .then(note => {
                if(!note) {
                    logger.error(`note with id ${req.params.note_id} not found`)
                    return res.status(404).json({
                        error: { message: `not found`}
                    })
                }
                res.note = note
                next()
            })
            .catch(next)
    })
    .get((req, res) => {
        return res.json(serializeNote(res.note))
    })
    .delete((req, res, next) => {
        NotesService.deleteNote(req.app.get('db'), parseInt(req.params.note_id))
            .then(data => {
                logger.info(`note with id ${req.params.note_id} deleted`)
                res.status(204).end()
            })
            .catch(next)
    })
    .patch(jsonParser, (req, res, next) => {
        const { title, content, folder_id } = req.body
        const folder_idNum = parseInt(folder_id)
        const updatedNote = { title, content, folder_id: folder_idNum }

        const numValues = Object.values(updatedNote).filter(Boolean).length
        if(numValues === 0) {
            logger.error(`must include at least one field to update`)
            return res.status(400).json({
                error: { message: 'request must contain a field to update' }
            })
        }

        NotesService.updateNote(req.app.get('db'), parseInt(req.params.note_id), updatedNote)
            .then(data => {
                res.status(204).end()
            })
            .catch(next)
    })

module.exports = notesRouter