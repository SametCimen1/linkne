CREATE DATABASE linkne;

CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    email VARCHAR(255)  NOT NULL UNIQUE,
    password  VARCHAR(500) NOT NULL,
    userName   VARCHAR(255)  UNIQUE NOT NULL,
    picture text,
    total_link_number integer,
    verificationCode VARCHAR(255),
    number_name_update integer,
    is_verified boolean NOT NULL,
    time_verification timestamp NOT NULL,
    time_name_update timestamp NOT NULL,
    ref integer REFERENCES users(id)
);

-- ALTER TABLE users ADD ref integer;
-- ALTER TABLE users ADD number_name_update integer;
-- ALTER TABLE users ADD is_verified boolean NOT NULL DEFAULT false;
-- ALTER TABLE users ADD time_verification timestamp NOT NULL DEFAULT '2023-03-20 16:27:00';
-- ALTER TABLE users ADD time_name_update timestamp NOT NULL DEFAULT '2023-03-20 16:27:00';


CREATE TABLE links(
    id SERIAL PRIMARY KEY,
    userid integer REFERENCES users(id),
    oldname  VARCHAR(500) NOT NULL,
    newname  VARCHAR(500) NOT NULL,
    description VARCHAR(500),
    header VARCHAR(255),
    picture VARCHAR(255),
    is_visible boolean NOT NULL,
    views integer NOT NULL,
    category VARCHAR(500) NOT NULL,
    time_link timestamp NOT NULL
);
-- ALTER TABLE links DROP COLUMN tagone;
-- ALTER TABLE links ADD time_link timestamp NOT NULL DEFAULT '2023-03-20 16:27:00';


CREATE TABLE tags(
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);
CREATE TABLE tags_selected(
    id SERIAL PRIMARY KEY,
    tagid integer REFERENCES tags(id),
    linkid integer REFERENCES links(id),
    userid integer REFERENCES users(id)
);

CREATE TABLE dailysave(
    id SERIAL PRIMARY KEY,
    userid integer REFERENCES users(id),
    date date,
    views integer NOT NULL,
    clicks integer NOT NULL
);

CREATE TABLE categories(
    id SERIAL PRIMARY KEY,
    postid integer REFERENCES links(id),
    categories VARCHAR(400)
);

CREATE TABLE clicks(
    id SERIAL PRIMARY KEY,
    clicker_ip integer NOT NULL,
    linkne_id integer REFERENCES links(id) NOT NULL,
    country VARCHAR(255) NOT NULL,
    clicked_time time NOT NULL
);


CREATE TABLE errors(
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) NOT NULL,
    header VARCHAR(300) NOT NULL,
    body VARCHAR(2000) NOT NULL
);



UPDATE users SET picture = 'https://imgs.search.brave.com/y_y1g5xAQJnyFi1PEmS3mzb2ouMsxNpnUe4BIaFxPB8/rs:fit:600:376:1/g:ce/aHR0cHM6Ly9wYnMu/dHdpbWcuY29tL21l/ZGlhL0J0RlVycDZD/RUFFbXNtbC5qcGc' WHERE id = 4;
UPDATE users SET is_verified = true;


INSERT INTO links (userid, oldname, newname, description, picture) VALUES (1, 'samet', 'https://youtube.com','Csgo crack', 'https://imgs.search.brave.com/q3AJoWxjyfj-srOPV65HvNyaOhtswZTKo_rAvXruCGw/rs:fit:1200:1200:1/g:ce/aHR0cHM6Ly93d3cu/Z2FtZXJzZGVjaWRl/LmNvbS9zaXRlcy9k/ZWZhdWx0L2ZpbGVz/L2NzZ29fZ3VuX3Nr/aW4uanBn');

INSERT INTO links (userid, oldname, newname, description, picture) VALUES (1, 'samet', 'https://www.youtube.com/watch?v=TjaQrIGdYrk','Öp Beni Ezel, Canımı Acıt', 'https://imgs.search.brave.com/q3AJoWxjyfj-srOPV65HvNyaOhtswZTKo_rAvXruCGw/rs:fit:1200:1200:1/g:ce/aHR0cHM6Ly93d3cu/Z2FtZXJzZGVjaWRl/LmNvbS9zaXRlcy9k/ZWZhdWx0L2ZpbGVz/L2NzZ29fZ3VuX3Nr/aW4uanBn');

DROP TABLE links;
alter table links add column views integer;



DROP TABLE users;
INSERT INTO users(email, phoneNumber, password, username) VALUES ('cimensamet338@gmail.com', '609-742-9477', 'Samet2005', 'sametcimen');