var mysql = require("mysql");
var inquirer = require("inquirer");

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
    // run the managerAction function after the connection is made to prompt the user
    managerAction();
});

function managerAction() {
    inquirer
        .prompt({
            name: "option",
            type: "list",
            message: "Would you like to [VIEW PRODUCTS FOR SALE] or [VIEW LOW INVENTORY] or [ADD TO INVENTORY] or [ADD NEW PRODUCT]?",
            choices: ["VIEW PRODUCTS FOR SALE", "VIEW LOW INVENTORY", "ADD TO INVENTORY", "ADD NEW PRODUCT"]
        })
        .then(function(answer) {

            console.log("You chose: " + answer.option);
            // based on their answer, call the respective functions
            switch (answer.option) {

                case "VIEW PRODUCTS FOR SALE":
                    // the app should list every available item: the item IDs, names, prices, and quantities.
                    console.log("VIEW PRODUCTS FOR SALE")
                    viewProducts();
                    break;
                case "VIEW LOW INVENTORY":
                    // then it should list all items with an inventory count lower than five. 
                    console.log("VIEW LOW INVENTORY");
                    viewLow();
                    break;
                case "ADD TO INVENTORY":
                    // your app should display a prompt that will let the manager "add more" of any item currently in the store.
                    console.log("ADD TO INVENTORY")
                    addStock();
                    break;
                case "ADD NEW PRODUCT":
                    // it should allow the manager to add a completely new product to the store
                    console.log("ADD NEW PRODUCT")
                    addNew();
                    break;
                default:
                    console.log("Please choose from one of the options");
                    break;
            }

            function viewProducts() {
                var query = "SELECT * FROM products";
                connection.query(query,
                    function(err, res) {
                        if (err) throw err;
                        for (var i = 0; i < res.length; i++) {
                            console.log("ID: " + res[i].item_id + " || Product: " + res[i].product_name + " || Department: " + res[i].department_name + " || Price: " + res[i].price + " || Quantity: " + res[i].stock_quantity);
                        }
                        console.log("---------------------------------------------")
                        managerAction();
                    });
            }

            function viewLow() {
                var query = "SELECT * FROM products WHERE (stock_quantity < 5)";
                connection.query(query,
                    function(err, res) {
                        if (err) throw err;
                        for (var i = 0; i < res.length; i++) {
                            console.log("ID: " + res[i].item_id + " || Product: " + res[i].product_name + " || Department: " + res[i].department_name + " || Price: " + res[i].price + " || Quantity: " + res[i].stock_quantity);
                        }
                        console.log("---------------------------------------------")
                        managerAction();
                    });
            }

            function addStock() {
                var items = [];
                //GET ALL PRODUCTS FROM MYSQL
                connection.query('SELECT product_name FROM products', function(err, res) {
                    if (err) throw err;
                    //PUSH PRODUCTS IN INVENTORY TO ARRAY
                    for (var i = 0; i < res.length; i++) {
                        items.push(res[i].product_name)
                    }
                    //ASK USER WHICH ITEMS FROM SHOWN WOULD THEY LIKE TO UPDATE?
                    inquirer.prompt([{
                        name: 'choices',
                        type: 'checkbox',
                        message: 'Which product would you like to add inventory for?',
                        choices: items
                    }]).then(function(answer) {
                        //IF NOTHING IS SELECTED RUN MANAGER PROMPT FUNCTION AGAIN
                        if (answer.choices.length === 0) {
                            console.log('Oops! You didn\'t select anything!');
                            console.log("---------------------------------------------")
                            managerAction();
                        } else {

                            addStock2(answer.choices);

                        }
                    });
                });
            }

            function addStock2(itemNames) {
                //SETS THE ITEM TO THE 1ST ITEM OF THE 1ST ELEMENT OF THE ARRAY AND RMEOVES THAT ELEMENT FORM THE ARRAY
                var item = itemNames.shift();
                var itemStock;
                //CONNECTION TO MYSQL TO QUERY AND GET STOCK QUANTITY FOR THAT ITEM 
                connection.query('SELECT stock_quantity FROM products WHERE ?', {
                    product_name: item
                }, function(err, res) {
                    if (err) throw err;
                    itemStock = res[0].stock_quantity;
                    itemStock = parseInt(itemStock)
                });
                //ASK USER HOW MANY ITEMS HE WOULD LIKE TO ADD 
                inquirer.prompt([{
                    name: 'amount',
                    type: 'text',
                    message: 'How many units of ' + item + ' would you like to add?',
                    //HANDLING WHICH MAKES INPUT TO BE A NUMBER AND NOT A LETTER 
                    validate: function(value) {
                        if (isNaN(parseInt(value))) {
                            console.log('Sorry that is not a valid number!');
                            return false;
                        } else {
                            return true;
                        }
                    }
                }]).then(function(answer) {
                    var amount = answer.amount
                    amount = parseInt(amount);
                    //UPDATE DATABSE PRODUCTS TO REFLECT THE NEW STOCK QUANTITY OF ITEMS.
                    connection.query('UPDATE products SET ? WHERE ?', [{
                        stock_quantity: itemStock += amount
                    }, {
                        product_name: item
                    }], function(err) {
                        if (err) throw err;
                    });
                    //IF ITEMS STAYED IN THE ARRAY RUN THE addStock2 FUNCTION AGAIN 
                    if (itemNames.length != 0) {
                        addStock2(itemNames);
                    } else {
                        //IF THERE ARE NO MORE ITEMS RUN THE MANAGER PROMPT FUNCTION TO START ALL OVER.
                        console.log('Thank you, Your inventory has been updated.');
                        console.log("---------------------------------------------")
                        managerAction();
                    }
                });
            }

            function addNew() {
                var deptNames = [];
                //grab name of departments
                connection.query('SELECT * FROM departments', function(err, res) {
                    if (err) throw err;
                    for (var i = 0; i < res.length; i++) {
                        deptNames.push(res[i].department_name);
                    }
                })

                // ask questions to get the values for the new product
                inquirer
                    .prompt([{
                            name: "productName",
                            type: "input",
                            message: "What is the new product you would like to add?"
                        },
                        {
                            name: "deparmentName",
                            type: "list",
                            message: "What department would you like to place your new product in?",
                            choices: deptNames
                        },
                        {
                            name: "setPrice",
                            type: "input",
                            message: "What is the pricing of the new product?",
                            validate: function(value) {
                                if (isNaN(value) == false) {
                                    return true;
                                } else {
                                    return false;
                                }
                            }
                        },
                        {
                            name: "setQuantity",
                            type: "input",
                            message: "How many units of the new product will you add?",
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
                            "INSERT INTO products SET ?", {
                                product_name: answer.productName,
                                department_name: answer.deparmentName,
                                price: answer.setPrice,
                                stock_quantity: answer.setQuantity
                            },
                            function(err) {
                                if (err) throw err;
                                console.log("Your new product was added successfully!");
                                console.log("---------------------------------------------")
                                managerAction();
                            }
                        );
                    });
            }

        });
}