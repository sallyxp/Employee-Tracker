/* Seeds for SQL tables.  */
USE employeetracker_db;

/* Insert 3 Rows into your new table */
INSERT INTO department (name)
VALUES ("Sales"),
("Engineering"),
("Finance"),
("Legal");

USE employeetracker_db;
INSERT INTO role (title, salary, department_id)
VALUES ("Sales Lead", 100000, 3),
("Salesperson", 80000, 1),
("Lead Engineer", 150000, 2),
("Software Engineer", 120000, 3);

USE ffs_db;
INSERT INTO restaurant (name, location)
VALUES 
("Burgess Burgers2", "Birmingham");


USE employeetracker_db;
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("John", "Doe", 1, 1);

USE employeetracker_db;
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Mike", "Chan", 2, 2);

USE employeetracker_db;
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Kevin", "Tupik", 4, 3); 


("Kevin", "Tupik", 4, 3);

select 