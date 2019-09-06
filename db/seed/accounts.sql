CREATE TABLE accounts (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    checking DECIMAL,
    savings DECIMAL,
    pin TEXT
);