DROP DATABASE IF EXISTS employeetracker_db;
-- Creates the "employeetracker_db" database --
CREATE DATABASE employeetracker_db;

Use employeetracker_db;

CREATE TABLE department (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR (30) NOT NULL
);

CREATE TABLE role (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR (38),
  salary DECIMAL(10,2) NULL,
  department_id INT,
  CONSTRAINT FK_department_id FOREIGN KEY (department_id) REFERENCES department(id)
  ON DELETE CASCADE
);

CREATE TABLE employee (
   id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR (38),
  last_name VARCHAR (30),
  role_id INT,
  CONSTRAINT FK_role_id FOREIGN KEY (role_id) REFERENCES role(id),
  manager_id INT, 
 CONSTRAINT FK_manager_id FOREIGN KEY (manager_id) REFERENCES employee(id)
        ON DELETE CASCADE
);

SELECT * FROM department;
SELECT * FROM role;
SELECT * FROM employee;

