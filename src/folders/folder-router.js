const express = require('express')
const xss = require('xss')
const logger = require('../logger')
const FoldersService = require('./folders-service')

const foldersRouter = express.Router()
const jsonParser = express.json()

const serializeFolder = folder => ({
    id: folder.id,
    title: xss(folder.title)
})

foldersRouter
    .route('/')
    .get((req, res, next) => {
        FoldersService.getAllFolders(req.app.get('db'))
            .then(folders => {
                return res.json(folders.map(folder => serializeFolder(folder)))
            })
            .catch(next)
    })
    .post(jsonParser, (req, res, next) => {
        const { title } = req.body
        const newFolder = { title }
        console.log(newFolder)
        if (newFolder.title == null) {
            logger.error(`title is a required field`)
            return res.status(400).json({
                error: { message: `title missing from request body`}
            })
        }
        FoldersService.insertFolder(req.app.get('db'), newFolder)
            .then(folder => {
                logger.info(`folder with id ${folder.id} created`)
                return res.status(201).location('http://localhost:8000/api/folders/${folder.id}').json(serializeFolder(folder))
            })
            .catch(next)
    })

foldersRouter
    .route('/:folder_id')
    .all((req, res, next) => {
        const id = parseInt(req.params.folder_id)
        FoldersService.getFolderById(req.app.get('db'), id)
            .then(folder => {
                if (!folder) {
                    logger.error(`folder with id ${id} not found`)
                    return res.status(404).json({
                        error: {message: 'not found'}
                    })
                }
                res.folder = folder
                next()
            })
            .catch(next)
    })
    .get((req, res) => {
        return res.json(serializeFolder(res.folder))
    })
    .delete((req, res, next) => {
        const id = parseInt(req.params.folder_id)
        FoldersService.deleteFolder(req.app.get('db'), id)
            .then(data => {
                logger.info(`folder with id ${id} deleted`)
                return res.status(204).end()
            })
            .catch(next)
    })
    .patch(jsonParser, (req, res, next) => {
        const { title } = req.body
        const updatedFolder = { title }
        if (updatedFolder.title === null) {
            logger.error(`must send field to update`)
            return res.status(400).json({
                error: { message: `send a field to update`}
            })
        }
        FoldersService.updateFolder(req.app.get('db'), parseInt(req.params.folder_id), updatedFolder)
            .then(data => {
                logger.info(`folder with id ${req.params.folder_id} updated`)
                return res.status(204).end()
            })
            .catch(next)
    })

module.exports = foldersRouter