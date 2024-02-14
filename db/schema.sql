DROP DATABASE IF EXISTS EmplyeeDirectory_db;
CREATE DATABASE EmplyeeDirectory_db;

USE EmplyeeDirectory_db;

CREATE TABLE department (
    id INT AUTO_INCREMENT PRIMARY KEY, 
    name VARCHAR(30) NOT NULL
);