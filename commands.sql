CREATE TABLE blogs (
    id SERIAL PRIMARY KEY,
    author VARCHAR(1024),
    url VARCHAR(1024) NOT NULL,
    title VARCHAR(1024) NOT NULL,
    likes INTEGER DEFAULT 0
);

INSERT INTO blogs (author, url, title) VALUES 
('Dan Abramov', 'http://localhost:3000', 'On let vs const'),
('Lauren Albe', 'http://localhost:3000', 'Gasp in sequences in PostgreSQL');