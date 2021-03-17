# Employee-Tracker
Creation of a Content Management System (CMS) to manage a company's employees using Node, Inquirer and MySQL.

The task was to create a database from the assigned schema and the command line application should allow the users to:
 - add departments, roles, employees
 - view departments, roles, employees
 - update employee roles

 In addition some bonus features were also requested:
 - update employee manager
 - view employee by manager
 - deletion of employees
 - view the total utilized budget of a department - ie total salaries by department

 A seed file populating the database with some inital data has also been created.

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
- [Screenshots](#screenshots)
- [Contact Me](#contact-me)
💾 Installation
In order to install this app, the user must have all of the following installed and running on their local machines successfully:
## *Installation*
The user must clone all files from this repository.  It is important that the file locations remain the same in relation to each other.

To run, node.js must be installed. The file index.js must be downloaded to a directory. Open the command line (within the same directory as index.js).  inquirer must first be installed before running by typing npm i inquirer in the same directory.

Then type _node index.js_ to run.  The questions will then be generated with prompts for the user to respond. _CTRL-C_ can terminate the program at any point.

NB The package.json is set up correctly to run the program and tests.  Should there be a problem _npm init_ can be used to create another.

need to review:  XX
Git bash (or terminal), to pull this app from Github
Visual Studio Code (VSC), to view the code
Node.js, to run the commands and inquirer prompts
MySQL Workbench, to run the database
XAMPP Control Panel, if user uses Windows, to 'Start' MySQL to connect in the Node terminal
After having set up all of the above, install the following packages and dependancies:

package.json (for node modules):
npm install
mysql

inquirer, to prompt user questions in node
npm install inquirer

console.table, to view databases in node
npm install console.table

## *Contributing and Questions*
For any suggestions or questions, please feel free to contact me via my Github page. (github.com/sallyxp)

## Testing
Opening each selection and running and checking the output is as expected

## *Authors*
Sally Rodgers

## *Screenshot*
![alt text](/Images/TeamHogworts.png)
![alt text](/Images/Prompts.png) 

## *Contact Me*
- Github: **[sallyxp](github.com/sallyxp)
- LinkedIn: **[Sally Rodgers](www.linkedin.com/in/sallyhello1)  
- Email: **[sallyhello1@yahoo.com](mailto:sallyhello1@yahoo.com)

This project is MIT licensed. ![license](https://img.shields.io/static/v1?label=license&message=MIT&color=blueviolet) 
&copy; 2021 Sally Rodgers