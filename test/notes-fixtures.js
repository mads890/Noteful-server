function makeNotesArray() {
    return [
        {
            id: 1,
            title: 'test title 1',
            content: 'test content 1',
            author: 'test author 1',
            modified: new Date(),
            folder_id: 1
        },
        {
            id: 2,
            title: 'test title 2',
            content: 'test content 2',
            author: 'test author 2',
            modified: new Date(),
            folder_id: 2
        },
        {
            id: 3,
            title: 'test title 3',
            content: 'test content 3',
            author: 'test author 3',
            modified: new Date(),
            folder_id: 3
        },
        {
            id: 4,
            title: 'test title 4',
            content: 'test content 4',
            author: 'test author 4',
            modified: new Date(),
            folder_id: 1
        },
    ]
}

module.exports = { makeNotesArray }