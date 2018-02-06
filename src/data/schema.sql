DROP TABLE IF EXISTS users;
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  password TEXT NOT NULL,
  joined_at DATE DEFAULT CURRENT_DATE,
  user_image_url TEXT,
  primary_city TEXT NOT NULL
);

DROP TABLE IF EXISTS cities;
CREATE TABLE cities (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  description TEXT,
  city_image_url TEXT
);

DROP TABLE IF EXISTS posts;
CREATE TABLE posts (
  id SERIAL PRIMARY KEY,
  city_id INTEGER NOT NULL REFERENCES cities,
  user_id INTEGER NOT NULL REFERENCES users,
  title VARCHAR(200) NOT NULL CHECK (title != ''),
  body TEXT NOT NULL CHECK (body != ''),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);