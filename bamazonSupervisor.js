var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require('cli-table2');

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    // Your username
    user: "root",
    // Your password
    password: "Alters88",
    database: "bamazon_DB"
});

connection.connect(function(err) {
    if (err) throw err;
    // run the start function after the connection is made to prompt the user
    supervisorAction();
});

function supervisorAction() {
    inquirer
        .prompt({
            name: "option",
            type: "list",
            message: "Would you like to [VIEW PRODUCT SALES BY DEPARTMENT] or [CREATE NEW DEPARTMENT]?",
            choices: ["VIEW PRODUCT SALES BY DEPARTMENT", "CREATE NEW DEPARTMENT"]
        })
        .then(function(answer) {

            console.log("You chose: " + answer.option);
            // based on their answer, call the respective functions
            switch (answer.option) {

                case "VIEW PRODUCT SALES BY DEPARTMENT":
                    //  the app should display a summarized table in their terminal/bash window.
                    console.log("VIEW PRODUCT SALES BY DEPARTMENT")
                    viewProdByDept();
                    break;
                case "CREATE NEW DEPARTMENT":
                    // then it should list all items with an inventory count lower than five. 
                    console.log("CREATE NEW DEPARTMENT");
                    createNewDept();
                    break;
                default:
                    console.log("Please choose from one of the options");
                    break;
            }

            function viewProdByDept() {
                var query = " select * from bamazon_DB.departments inner join bamazon_DB.products where bamazon_DB.departments.department_name = bamazon_DB.products.department_name group by department_id";
                connection.query(query,
                    function(err, res) {
                        if (err) throw err;

                        // console.log("---------------------------------------------")
                        // console.log(res[0].department_id);
                        // console.log(res[0].department_name);
                        // console.log(res[0].over_head_costs);
                        // console.log(res[0].product_sales);
                        var table = new Table({
                            head: ['department_id', 'department_name', 'over_head_costs', 'product_sales', 'total_profit'],
                            colWidths: [22, 22, 22, 22, 22]
                        });
                        for (var i = 0; i < res.length; i++) {
                            table.push(
                                [res[i].department_id, res[i].department_name, res[i].over_head_costs, res[i].product_sales, (res[i].product_sales - res[i].over_head_costs)]);
                        }

                        // table is an Array, so you can `push`, `unshift`, `splice` and friends 


                        console.log(table.toString());

                        supervisorAction();




                    });
            }

            function createNewDept() {
                // ask questions to get the values for the new product
                inquirer
                    .prompt([{
                            name: "deparmentName",
                            type: "input",
                            message: "What is the name of the new department?"
                        },
                        {
                            name: "overHead",
                            type: "input",
                            message: "What is the overhead cost of the new department?",
                            validate: function(value) {
                                if (isNaN(value) == false) {
                                    return true;
                                } else {
                                    return false;
                                }
                            }
                        }
                    ])
                    .then(function(answer) {
                        // when finished prompting, insert a new item into the db with that info
                        connection.query(
                            "INSERT INTO departments SET ?", {
                                department_name: answer.deparmentName,
                                over_head_costs: answer.overHead
                            },
                            function(err) {
                                if (err) throw err;
                                console.log("Your new department was added successfully!");
                                console.log("---------------------------------------------")
                                supervisorAction();
                            }
                        );
                    });
            }



        });
}