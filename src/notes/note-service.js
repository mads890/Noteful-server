const NotesService = {
    getAllNotes(knex) {
        return knex.select('*').from('notes')
    },
    getNoteById(knex, id) {
        return knex.select('*').from('notes').where({ id })
    },
    insertNote(knex, note) {
        return knex.insert(note).into('notes').returning('*')
            .then(rows => {
                return rows[0]
            })
    },
    deleteNote(knex, id) {
        return knex.from('notes').where({ id }).delete()
    },
    updateNote(knex, id, updated) {
        return knex.from('notes').where({ id }).update(updated)
    },
}

module.exports = NotesService