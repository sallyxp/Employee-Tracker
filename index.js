//dependencies
const mysql = require("mysql");
const inquirer = require("inquirer");
const cTable = require("console.table");
const chalk = require("chalk");
const log = console.log;


//connecting to database 
const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: '',
    password: '',
    database: "employeetracker_db"
})

//connecting to server and database 
connection.connect(function(err){
    if (err) throw err;
    console.log ("\n"); 
    console.log ("");
    console.log (chalk.bold.bgCyan("======================================"));
    console.log ("");
    console.log (chalk.bold.bgMagenta(`   WELCOME TO THE EMPLOYEE TRACKER   `));
    console.log ("");
    console.log (chalk.bold.bgCyan("======================================"));
    console.log ("\n");  
    })

//main menu/ start app
Start = () => {
    inquirer
        .prompt({
            name: "action",
            type: "list",
            message: "Please select from the following choices:",
            choices: [
                "Add a new department",
                "Add a new role",
                "Add a new employee",
                "Delete an employee",
                "Show detailed employee info",
                "Total budget by department",
                "View departments",
                "View employees",
                "View employees by manager",
                "View roles",
                "Update employee manager",
                "Update employee roles",
                "End"
            ]
        }).then((answer) => {
            switch (answer.action) {
                case "Add a new department":
                    addDepartment();
                    break;
                case "Add a new role":
                    addRole();
                    break;
                case "Add a new employee":
                    addEmployee();
                    break;
                case "Delete an employee":
                    deleteEmployee();
                    break;
                case "Show detailed employee info":
                    showDetailedEmployees();
                    break;
                case "Total budget by department":
                    showTotalBudgetbyDept();
                    break;
                case "View departments":
                    showDepartments();
                    break;
                case "View employees":
                    showEmployees();
                    break;
                case "View employees by manager":
                    showEmpbyManager();
                    //showDepartments();
                    break;
                case "View roles":
                    showRoles();
                    break;
                case "Update employee manager":
                    updateEmployeeManager();
                    break;
                case "Update employee roles":
                    updateEmployeeRole();
                    break;
                case "End":
                    promptEnd();
                    break;
                default:
                    break;
            }
        })
};


//********************* 
// View Departments
//*********************

const showDepartments = () => {
    console.log('Selecting all departments...\n');
    connection.query('SELECT * FROM department', (err, res) => {
      if (err) throw err;
      // Log all results of the SELECT statement
      console.table(res);

      Start();
    })
  }
//*****/

//********************* 
// View Roles
//*********************

const showRoles = () => {
    console.log('Selecting all roles...\n');
    connection.query('SELECT * FROM role', (err, res) => {
      if (err) throw err;
      // Log all results of the SELECT statement
      console.table(res);
      Start();
    })
  }  
//******************************************** 
// View Employees
//**********************************************

const showEmployees = () => {
    console.log('Selecting all employees...\n');
    connection.query('SELECT * FROM employee', (err, res) => {
      if (err) throw err;
      // Log all results of the SELECT statement
      console.table(res);
      Start();
    })
  }

 //********************************************************************* 
// View Employees by manager
//**********************************************************************

const showEmpbyManager = () => {
    console.log('Displaying all employees by their Manager..\n');
    connection.query('SELECT emp.first_name, emp.last_name, emp.manager_id,' 
    + 'concat(manager.first_name, " ", manager.last_name) as Manager ' 
    +  'FROM employee as emp ' 
    +  'LEFT JOIN employee as manager '
    + 'ON emp.manager_id = manager.id '
    + ' ORDER BY manager_id',
    (err, res) => {
      if (err) throw err;
      // Log all results of the SELECT statement
      console.table(res);

      Start();
    })
  }

//***************************************************************************
// View Employees by Dept with Salary */
//*************************************************************************** */

const showDetailedEmployees = () => {
    console.log('Displaying all employees by their Dept..\n');
    connection.query('SELECT emp.id, concat(emp.first_name, " ", emp.last_name) as Name,  role.salary, dept.name'
    + ' FROM employee as emp '
    + ' INNER JOIN role as role '
    + ' ON emp.role_id = role.id '
    + ' INNER JOIN department as dept '
    + ' ON role.department_id = dept.id '
    + ' ORDER BY dept.name',
     (err, res) => {
      if (err) throw err;
      // Log all results of the SELECT statement
      console.table(res);
    Start();
    })
  }




//********************************************** 
// View Total Budget by Department
//**********************************************

const showTotalBudgetbyDept = () => {
    console.log('Displaying all employees by their Manager..\n');
    connection.query('SELECT dept.name, sum(salary)' 
    + 'FROM employee as emp '
    + 'INNER JOIN role as role '
    + 'ON emp.role_id = role.id '
    + 'INNER JOIN department as dept '
    + 'ON role.department_id = dept.id '
    + 'GROUP BY salary, dept.name',
    (err, res) => {
      if (err) throw err;
      // Log all results of the SELECT statement
      console.table(res);

      Start();
    })
  }

//*****************************************************************************/  
// updateManagerRole within Employee table
// Update manager in the Employee table - ability to change Employee's manager
//*****************************************************************************/
function updateEmployeeManager() {
    // UPDATE EMPLOYEE MANAGER

    connection.query(
        "SELECT * FROM employee;",
        (err, res) => {
            if (err) throw err;
            inquirer.prompt([
                {
                    type: "rawlist",
                    message: "Please specify the new MANAGER's last name:",
                    name: "lastName",
                    choices: () => {
                        var lastName = [];
                        for (var i = 0; i < res.length; i++) {
                            lastName.push(res[i].last_name);
                        }
                        return lastName;
                    }
                },
                {
                    type: "input",
                    message: "Please specify the ID of the employee we are changing:",
                    name: "id",
                   
                }
            ]).then(answer => {
                var managerId;
                for (let j = 0; j < res.length; j++) {
                    if (res[j].last_name == answer.lastName) {
                        managerId = res[j].id;
                    }
                    
                }
                connection.query(`UPDATE employee SET manager_id = ${managerId} WHERE id = ?`,
                    [answer.id],
                    (err, res) => {

                        if (err) throw err;
                        console.log("Employee manager has been updated!");
                        Start();
                    }
                )
            })
        })
}
//*****************************************************************************/
//delete an Employee
//*****************************************************************************/  
function deleteEmployee() {
    // this function will delete a given employee
    connection.query(
        "SELECT employee.id, employee.first_name, employee.last_name FROM employee;",
        (err, res) => {
            if (err) throw err;
            console.table(res);
            inquirer.prompt([
                {
                    type: "input",
                    message: "Please choose the ID of the employee to delete:",
                    name: "employee"
                },
            ]).then((answer) => {
                connection.query(
                    `DELETE FROM employee WHERE id = ?;`,
                    [answer.employee],
                    (err, res) => {
                        if (err) throw err;
                        console.log("Your employee has been deleted!");
                        console.table(res);
                        Start();
                    })
            })
        })
}
 
//************************************************************************************ */
//delete a role
// if a role is set in existing records - you do not want to delete associated records.
// this function will delete a given role from the Role table.
//firstly any associated employee records will be updated - role id = 0 
//the the record will be deleted.
// so will update any roles to 0
//***************************************************************************************/  

//*********************************************
// updateEmployeeRole
// Update roles in the Employee table
//*********************************************
function updateEmployeeRole() {
//********************************************** */
// UPDATE EMPLOYEE ROLE
//********************************************** */
    connection.query(
        "SELECT * FROM employee;",
        (err, res) => {
            if (err) throw err;
            inquirer.prompt([ 
                {
                    type: "rawlist",
                    message: "Please specify the employee's last name:",
                    name: "lastName",
                    choices: () => {
                        var lastName = [];
                        for (var i = 0; i < res.length; i++) {
                            lastName.push(res[i].last_name);
                        }
                        return lastName;
                    }
                },
                {
                    type: "rawlist",
                    message: "Please specify the employee's new role:",
                    name: "role",
                    choices: selectRole()
                }
            ]).then((value) => {
                let roleId = selectRole().indexOf(value.role) + 1;
                connection.query(`UPDATE employee SET role_id = ${roleId} WHERE last_name = ?`,
                    [value.lastName],
                    (err, res) => {
                        
                    if (err) throw err;
                    console.log("Employee role has been updated!");
                 
                    Start();
                    }
                )
            })
        })
}
//***************************************************************** */
// MANAGER ARRAY SET UP FOR EMPLOYEE ADDITION 
//***************************************************************** */
let managerArr = [];
function selectManager() {
  connection.query("SELECT * FROM employee", function(err, res) {
    if (err) throw err
    for (var i = 0; i < res.length; i++) {
      managerArr.push(res[i].last_name);
    }
  })
  return managerArr;
}

//********************************************** */
managerArray = [];
const chooseManager = () => {
    connection.query(
        "SELECT * from employee",
        (err, res) => {
            if (err) throw err;
            for (var i = 0; i < res.length; i++) {
                managerArray.push(res[i].manager_id);
            }
        });
    return managerArray;
}
//*************************************************** */
// role list
//select role from array list
//*************************************************** */
let roleArray = [];                                            
function selectRole() {
  connection.query("SELECT * FROM role", function(err, res) {
    if (err) throw err
    for (var i = 0; i < res.length; i++) {
      roleArray.push(res[i].title);
    }
  })
  return roleArray;
}
//*********************************************/

addEmployee = () => {
    // need to add a role_id and manager_id for this employee
    // so need to query it first. Both role id and manager_id in same table.
    connection.query("SELECT * FROM Role", (err, res) => {
    if (err) throw err;

    inquirer 
    .prompt([
        {
            name: "first_name",
            type: "input", 
            message: "What is their first name? "
        },
        {
            name: "last_name",
            type: "input", 
            message: "What is their last name? "
        },
        {
            name: "role", 
            type: "list",
            choices: () => {
            let roleArray = [];
            for (let i = 0; i < res.length; i++) {
                roleArray.push(res[i].title);
            }
            return roleArray;
            },
            message: "What will be their role?"
        }, 
        
        {
                name: "choice",
                type: "rawlist",
                message: "Who is managing the new employee? ",
                choices: selectManager()
        },
        ]).then((answer) => {
            let roleID;
            
            for (let j = 0; j < res.length; j++) {
            if (res[j].title == answer.role) {
                roleID = res[j].id;
            }
        
         var managerId = selectManager().indexOf(answer.choice) + 1;
                                  
        }    
       
          connection.query(
            "INSERT INTO employee SET ?",
            {
                first_name: answer.first_name,
                last_name: answer.last_name,
                role_id: roleID,
                manager_id: managerId
            },
            (err, res) => {
                if (err)throw err;
                console.log("New employee added");
                Start();
            }
        )
    })
    })   
}
//********************************* */

addDepartment = () => {
    inquirer
    .prompt([
        {
            name: "name", 
            type: "input", 
            message: "Please enter the name of the new department. "
        }
    ]).then((answer) => {
        connection.query(
            "INSERT INTO department SET ?",
            {
                name: answer.name
            }
        );
        var query = "SELECT * FROM department";
        connection.query(query, (err, res) => {
        if(err)throw err;
       console.log("New department added");
        Start();
        })
    })
}

addRole = () => {
    // need to add a department for this role so need to query it first.
    connection.query("SELECT * FROM department", (err, res) => {
    if (err) throw err;

    inquirer 
    .prompt([
        {
            name: "title",
            type: "input", 
            message: "What is the new role? "
        },
        {
            name: "salary",
            type: "input",
            message: "What is the salary of the new role? "
        },
        {
            name: "departmentid",
            type: "list",
            choices: () => {
                let deptArray = [];
                for (let i = 0; i < res.length; i++) {
                    deptArray.push(res[i].name);
                }
                return deptArray;
            },
        }
    ]).then((answer) => {
        let deptID;
        for (let j = 0; j < res.length; j++) {
            if (res[j].name == answer.departmentid) {
                deptID = res[j].id;
            }
        }

        connection.query(
            "INSERT INTO role SET ?",
            {
                title: answer.title,
                salary: answer.salary || 0,
                department_id: deptID
            },
            (err, res) => {
                if(err)throw err;
                console.log("New role added");
                Start();
            }
        )
    })
    })   
}
Start();

promptEnd = () => {
    console.log (" Thank you for using the Employee Tracker. ");
             
    connection.end();
}