CREATE TYPE platform AS ENUM ('facebook', 'snap', 'instagram', 'tiktok');

CREATE TABLE sites (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    url VARCHAR(255) NOT NULL
);

CREATE TABLE affiliates (
    id SERIAL PRIMARY KEY,
    affiliate_name VARCHAR(255) NOT NULL,
    rate DECIMAL
);

CREATE TABLE logging (
    id SERIAL PRIMARY KEY,
    site_id INTEGER NOT NULL REFERENCES sites(id),
    event VARCHAR(100) NOT NULL,
    aff INTEGER REFERENCES affiliates(id),
    platform PLATFORM,
    exp DATE,
    date DATE,
    server_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);