const FoldersService = {
    getAllFolders(knex) {
        return knex.select('*').from('folders')
    },
    getFolderById(knex, id) {
        return knex.select('*').from('folders').where({ id })
    },
    insertFolder(knex, folder) {
        return knex.insert(note).into('folders').returning('*')
            .then(rows => {
                return rows[0]
            })
    },
    deleteFolder(knex, id) {
        return knex.from('folders').where({ id }).delete()
    },
    updateFolder(knex, id, updated) {
        return knex.from('folders').where({ id }).update(updated)
    },
}

module.exports = FoldersService