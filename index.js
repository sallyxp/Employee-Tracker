//dependencies
const mysql = require("mysql");
const inquirer = require("inquirer");

//connecting to database 
const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '',
    database: "employeetracker_db"
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
            "TO DO:",    
            "EMPLOYEES.",
                "DEPARTMENTS.",
                "ROLES.",     
                "End"
        ]
    }).then((answer) => {
        switch (answer.action) {
            case "EMPLOYEES.":
               //To do
                break;
                case "DEPARTMENTS.":
                //To do
                break;
                case "ROLES":
                //to do
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
            case "End": 
                promptEnd();
                break;
            default:
                break;
        }
    })
};


//********************* */
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
            type: "rawlist",
            message: "select a role",
            choices: () => {
                let roleArray = [];
                for (let i = 0; i < res.length; i++) {
                    roleArray.push(res[i].title);
                }
                return roleArray;
            },
        } ,   
        {
            name: "manager",
            type: "rawlist",
            message: "select the employee's manager",
            choices: () => {
                let managerArray = [];
                for (let i = 0; i < res.length; i++) {
                    managerArray.push(res[i].title);
                }
                return managerArray;
            },
        }    
       
    ]).then((answer) => {
        connection.query(
            "INSERT INTO employee SET ?",
            {
                first_name: answer.first_name,
                last_name: answer.salary,
                role_id:answer.role_id,
                manager_id: answer.manager
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
            type: "rawlist",
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
                salary: answer.salary,
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
    connection.end();
}