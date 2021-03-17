# Employee-Tracker
Creation of a Content Management System (CMS) to manage a company's employees using Node, Inquirer and MySQL.

The task was to create a database from the assigned schema and the command line application should allow the users to:
 - add departments, roles, employees
 - view departments, roles, employees
 - update employee roles 

#The database Schema#

![alt text](/Images/Schema.png)

 In addition some bonus features were also requested:
 - update employee manager
 - view employee by manager
 - deletion of employees
 - view the total utilized budget of a department - ie total salaries by department

 A seed file was used to populate the database with some inital data has also been created.

 As this application won't be deployed, links are provided showing walkthrough videos that demonstrate the functionality:

- [Video](#video)
1.  This is a link to a video demonstrating the basic requirements of the project:
https://drive.google.com/file/d/1gPYEsJLwdCIkc1LO_htvZRwNqmh3kUUC/view

2.  This second link is also to a video demonstrating the program with the additional bonus features:

https://drive.google.com/file/d/1rtUJlAMUpzHqMUAMAFnYIMFNaQk0cHVD/view

This project is MIT licensed. ![GitHub license](![license](https://img.shields.io/static/v1?label=license&message=MIT&color=blueviolet))(0)

The database schema should match the given design below
![alt text](/Images/databasedesign.png) 

## *Table of Contents*
- [Description](#description)
- [Installation](#installation)
- [Usage](#usage)
- [Credits](#Credits) 
- [Contributing](#contributing)
- [Authors](#authors)
- [Contact Me](#contact-me)

## *Installation*
The user must clone all files from this repository.  It is important that the file locations remain the same in relation to each other.

To run the program, the database must be running.  I have written the program using MySQL Workbench so I have included this below.  

## To start MySQL Workbench (to run the database) ##
Open the XAMPP Control Panel, if user uses Windows, to 'Start' MySQL to connect in the Node terminal

![alt text](/Images/2XAMPP.png) 

To run, node.js must be installed. The file index.js must be downloaded to a directory. Open the command line (within the same directory as index.js).  inquirer must first be installed before running by typing `npm i inquirer` in the same directory.


Then type `node index.js` to run.  The questions will then be generated with prompts for the user to respond. `CTRL-C` can terminate the program at any point.

![alt text](/Images/OpeningScreen.png) 

NB The package.json is set up correctly to run the program and tests.  Should there be a problem `npm init` can be used to create another.

Once running, the following Menu choices will be displayed:
![alt text](/Images/MenuChoices.png) 

## Menu Choices: ##
Add a new department
Adds a new department record to the department table.

Add a new role
Adds a new role record to the role table.

Add a new employee
Adds a new employee record to the employee table.

Delete an employee
Deletes a specific employee based on user choice

Show detailed employee info
![alt text](/Images/ShowDetailedEmployeeInformation.png) 

Total budget by department
Shows the combined salaries of all the employees by department.
![alt text](/Images/Totalsalary.png) 

View departments
Shows all records in the department table.

View employees
Shows all records in the employee table, including id numbers.

View employees by manager
Shows all records in the employee table by manager.

View roles
Shows all records in the roles table.

Update employee manager
Allows the user to change the manager of an employee.  The user selects the manager and has to submit the employee id to be updated.

![alt text](/Images/Updatemanager.png) 

Update employee roles
Allows the user to change their role in a similar way to Update employee manager above.

End
This closes the application.

## Packages ##
 "chalk": "^4.1.0", - used for a colour title

    "console.table": "^0.10.0", - for displaying query data

    "inquirer": "^8.0.0", - for presenting questions to the user and processing responses

    sequelize - for SQL queries
    "mysql": "^2.18.1" - for SQL queries

## *Contributing and Questions*
For any suggestions or questions, please feel free to contact me via my Github page. (github.com/sallyxp)

## Testing
Opening each selection and running and checking the output is as expected

## *Authors*
Sally Rodgers


## *Contact Me*
- Github: **[sallyxp](github.com/sallyxp)
- LinkedIn: **[Sally Rodgers](www.linkedin.com/in/sallyhello1)  
- Email: **[sallyhello1@yahoo.com](mailto:sallyhello1@yahoo.com)

This project is MIT licensed. ![license](https://img.shields.io/static/v1?label=license&message=MIT&color=blueviolet) 
&copy; 2021 Sally Rodgers