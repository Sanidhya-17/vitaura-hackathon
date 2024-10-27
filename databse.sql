CREATE DATABASE task_manager;
USE task_manager;

CREATE TABLE tasks (
    id INT AUTO_INCREMENT PRIMARY KEY,
    task VARCHAR(255) NOT NULL
); 
SHOW TABLES;
INSERT INTO tasks (task) VALUES ('Task 1'), ('Task 2'), ('Task 3');
EXIT;


