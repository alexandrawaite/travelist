DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS cities;
DROP TABLE IF EXISTS posts;

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  password TEXT NOT NULL,
  joined_at DATE DEFAULT CURRENT_DATE,
  user_image_url TEXT DEFAULT 'https://s18.postimg.cc/5s07cv2ih/default-employer-profile.png',
  primary_city TEXT NOT NULL
);

CREATE TABLE cities (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  description TEXT,
  city_image_url TEXT
);

CREATE TABLE posts (
  id SERIAL PRIMARY KEY,
  city_id INTEGER NOT NULL REFERENCES cities,
  user_id INTEGER NOT NULL REFERENCES users,
  title VARCHAR(200) NOT NULL CHECK (title != ''),
  body TEXT NOT NULL CHECK (body != ''),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);