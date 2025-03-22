-- Create Artist Table
DROP TABLE IF EXISTS Artist;
CREATE TABLE Artist (
    artist_id INT AUTO_INCREMENT PRIMARY KEY,
    artist_name VARCHAR(255) NOT NULL,
    monthly_listeners INT DEFAULT 0,
    genre VARCHAR(100) NOT NULL
);
-- Create Album Table
DROP TABLE IF EXISTS Album;
CREATE TABLE Album (
    album_id INT AUTO_INCREMENT PRIMARY KEY,
    album_name VARCHAR(255) NOT NULL,
    artist_id INT,
    release_year INT NOT NULL,
    number_of_listens INT DEFAULT 0,
    FOREIGN KEY (artist_id) REFERENCES Artist(artist_id)
);
-- Create Song Table
DROP TABLE IF EXISTS Song;
CREATE TABLE Song (
    song_id INT AUTO_INCREMENT PRIMARY KEY,
    song_name VARCHAR(255) NOT NULL,
    release_year INT NOT NULL,
    album_id INT,
    FOREIGN KEY (album_id) REFERENCES Album(album_id)
);