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
    user: 'root',
    password: '',
    database: "employeetracker_db"
})

//connecting to server and database 
connection.connect(function(err){
    if (err) throw err;
    console.log ("");
    console.log (chalk.bold.bgMagenta("======================================"));
    console.log ("");
    console.log (chalk.bold.bgMagenta("   WELCOME TO THE EMPLOYEE TRACKER   "));
    console.log ("");
    console.log (chalk.bold.bgMagenta("======================================"));
       
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
            "View departments",
            "View roles",
            "View employees",  
            "Update employee manager",
            "Update employee roles",  
            "End"
        ]
    }).then((answer) => {
        switch (answer.action) {
                case "View departments":
                  showDepartments();
                  break;
                case "View roles":
                  showRoles();
                  break; 
                case "View employees":
                  showEmployees();
                  break;  
                case "Add a new department":
                  addDepartment();
                  break;
                case "Add a new role":
                  addRole();
                  break;
                case "Add a new employee":
                  addEmployee();
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

  //*****************************************************************************/  
// updateManagerRole
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
//************************************************** */

//*********************************************
// updateEmployeeRole
// Update roles in the Employee table
//*********************************************
function updateEmployeeRole() {
// UPDATE EMPLOYEE ROLE

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
// MANAGER ARRAY SET UP FOR EMPLOYEE ADDITION ____________________
let managersArr = [];
function selectManager() {
  connection.query("SELECT * FROM employee", function(err, res) {
    if (err) throw err
    for (var i = 0; i < res.length; i++) {
      managersArr.push(res[i].last_name);
    }
  })
  return managersArr;
}

//********************************************* */
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
//********************************************* */
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