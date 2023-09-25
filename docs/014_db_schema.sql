-- Creating Users table
CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(100) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(100) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    is_active BOOLEAN DEFAULT TRUE,
    is_verified BOOLEAN DEFAULT FALSE,
    role VARCHAR(50) DEFAULT 'user',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Creating Cryptocurrencies table
CREATE TABLE Cryptocurrencies (
    crypto_id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    symbol VARCHAR(10) NOT NULL,
    current_price DECIMAL(20, 8),
    market_cap DECIMAL(20, 2),
    volume DECIMAL(20, 2),
    description TEXT,
    logo_url VARCHAR(255)
);

-- Creating User_Portfolio table
CREATE TABLE User_Portfolio (
    portfolio_id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES Users(user_id),
    crypto_id INTEGER REFERENCES Cryptocurrencies(crypto_id),
    amount DECIMAL(20, 8) NOT NULL,
    purchase_price DECIMAL(20, 8) NOT NULL,
    purchase_date DATE NOT NULL
);

-- Creating index on email column in Users table
CREATE INDEX idx_email ON Users(email);

-- Ensure passwords are hashed before storing (This is a comment. Actual hashing should be done in the application layer before inserting into the database)
