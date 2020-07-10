DROP DATABASE IF EXISTS `loo_db`;
CREATE DATABASE `loo_db`;
USE `loo_db`;

CREATE TABLE bathroom
(
	id int NOT NULL AUTO_INCREMENT,
    last_verified DATETIME,
	location_name varchar(40) NOT NULL,
    street_address varchar(255),
	available BOOLEAN DEFAULT true,
    has_water BOOLEAN DEFAULT false,
    has_soap BOOLEAN DEFAULT false,
    has_paper BOOLEAN DEFAULT false,
    has_mirror BOOLEAN DEFAULT false,
    thumbs_up int,
    thumbs_down int,

	PRIMARY KEY (id)
);

CREATE TABLE bathroom_reviews
(
    id int NOT NULL AUTO_INCREMENT,
    review_id int,
	PRIMARY KEY (id)
);

CREATE TABLE review
(
    id int NOT NULL AUTO_INCREMENT,
    cleanliness int check( cleanliness between 0 and 100 ),
	PRIMARY KEY (id)
);

CREATE TABLE user
(
    id int NOT NULL AUTO_INCREMENT,
    email varchar(255) NOT NULL UNIQUE,
    password varchar(255) NOT NULL,
    createdAt DATETIME NOT NULL, 
    updatedAt DATETIME NOT NULL, 
    PRIMARY KEY (id)
);



