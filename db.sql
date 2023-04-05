CREATE TYPE platform AS ENUM ('facebook', 'snap', 'instagram', 'tiktok', 'native');

CREATE TABLE clients (
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
    site_id INTEGER NOT NULL REFERENCES clients(id),
    event VARCHAR(100) NOT NULL,
    aff INTEGER,
    ref TEXT,
    exp TIMESTAMP,
    date TIMESTAMP,
    sess UUID,
    s_user UUID,
    custom JSONB,
    server_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
