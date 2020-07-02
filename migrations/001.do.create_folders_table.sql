DROP TABLE IF EXISTS folders;

CREATE TABLE folders (
    id INTEGER PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
    title TEXT NOT NULL,
    date_created DATE DEFAULT now() NOT NULL
);