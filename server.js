const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "dist");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

var employeeArray = [];

// Write code to use inquirer to gather information about the development team members,

inquirer
//(name, id, email, officeNumber)
    .prompt([
        {
            type: "input",
            message: "What is the name of the Team Manager?",
            name: "name",
            default: "Dumbledore"
        },
        {
            type: "input",
            message: "What is the ID of the Team Manager?",
            name: "id",
            default: "WIZ1"
        },
        {
            type: "input",
            message: "What is the Email of the Team Manager?",
            name: "email",
            default: "dumbledore@hworts.com"
        },
        {
            type: "input",
            message: "What is the Office Number of the office they manage?",
            name: "officeNumber",
            default: "123123123"
        }
    ]).then(answers => {
        employeeArray.push(new Manager(answers.name, answers.id, answers.email, answers.officeNumber));
        promptNextEmployee();
        //fs.writeFile("testing.html", render(employeeArray), err => { console.log(err) });
    });

function addEngineer(){
    inquirer
    .prompt([
        {
            type: "input",
            message: "What is the name of the Engineer?",
            name: "name",
            default: "Engineer1"
        },
        {
            type: "input",
            message: "What is the ID of the Engineer?",
            name: "id",
            default: "ENG1"
        },
        {
            type: "input",
            message: "What is the Email of the Engineer?",
            name: "email",
            default: "hpotter@hworts.com"
        },
        {
            type: "input",
            message: "What is GitHub Username of the Engineer?",
            name: "github",
            default: "github.com/default"
        }
    ]).then(answers => {
        employeeArray.push(new Engineer(answers.name, answers.id, answers.email, answers.github));
        promptNextEmployee();
    });
}

function addIntern(){
    inquirer
    .prompt([
        {
            type: "input",
            message: "What is the name of the Intern?",
            name: "name",
            default: "defaultIntern"
        },
        {
            type: "input",
            message: "What is the ID of the Intern?",
            name: "id",
            default: "INT1"
        },
        {
            type: "input",
            message: "What is the Email of the Intern?",
            name: "email",
            default: "internname@hwarts.com"
        },
        {
            type: "input",
            message: "What school is the Intern from?",
            name: "school",
            default: "Gryffindor"
        }
    ]).then(answers => {
        employeeArray.push(new Intern(answers.name, answers.id, answers.email, answers.school));
        promptNextEmployee();
    });
}

function promptNextEmployee(){
    inquirer
    .prompt([
        {
            type: "list",
            message: "Would you like to add another employee?", 
            name: "another",
            choices: ["Yes", "NO"]
        }
    ]).then(answers => {
        if(answers.another == "Yes"){
            inquirer
            .prompt([
                {
                    type: "list",
                    message: "What type of employee are they?", 
                    name: "role",
                    choices: ["Engineer", "Intern"]
                }
            ]).then(answers => {
                if(answers.role == "Engineer"){
                    addEngineer();
                }else{
                    addIntern();
                }
            });
        }else{
            fs.writeFile(outputPath, render(employeeArray), err => { console.log("No more employees.  HTML created.") });
        }
    });
}

function testing(){
    inquirer
    .prompt([
        {
            type: "list",
            message: "Run This Again?", 
            name: "test",
            choices: ["Yes", "NO"]
        }
    ]).then(answers => {
        if(answers.test == "Yes"){
            employeeArray.push(answers.test);
            testing();
        }else{
            employeeArray.push(answers.test);
            console.log(employeeArray);
        }
    }).catch(error => {

    });
}

//testing();
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```