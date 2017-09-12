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
    // run the start function after the connection is made to prompt the user
    viewProducts();
});


function viewProducts() {
    var query = "SELECT * FROM products";
    connection.query(query,
        function(err, res) {
            if (err) throw err;
            for (var i = 0; i < res.length; i++) {
                console.log("ID: " + res[i].item_id + " || Product: " + res[i].product_name + " || Department: " + res[i].department_name + " || Price: " + res[i].price + " || Quantity: " + res[i].stock_quantity);
            }
            console.log("---------------------------------------------")
            purchase();
        });
} 

function purchase() {
    inquirer
        .prompt([{
            name: "itemID",
            type: "input",
            message: "What is the ID of the product you would like to buy?",
            validate: function(value) {
                if (isNaN(value) === false) {
                    return true;
                }
                return false;
            }
        }, {
            name: "itemQuantity",
            type: "input",
            message: "How many units of the product would you like to purchase?",
            validate: function(value) {
                if (isNaN(value) === false) {
                    return true;
                }
                return false;
            }
        }])
        .then(function(answer) {
            var requestedID = parseInt(answer.itemID);
            var requestedQuantity = parseInt(answer.itemQuantity);
            // console.log("Requested item ID:" + requestedID);
            // console.log("Requested item quantity:" + requestedQuantity);
            // console.log("--------------------------------------------");
            connection.query("SELECT * FROM products", function(err, results) {
                if (err) throw err;
                // console.log("Stock item ID:" + results[requestedID-1].item_id);
                // console.log("Stock item quantity:" + results[requestedID-1].stock_quantity);
                var stockID = parseInt(results[requestedID - 1].item_id);
                var stockQuantity = parseInt(results[requestedID - 1].stock_quantity);
                var stockPrice = parseFloat(results[requestedID - 1].price);
                var subtotal = requestedQuantity * stockPrice;
                var stockSales = parseFloat(results[requestedID - 1].product_sales)

                if (requestedID === stockID && requestedQuantity < stockQuantity) {
                    console.log("We have enough of the desired item in stock!!");
                    // console.log("Stock item ID: " + stockID);
                    // console.log("Stock item quantity:" + stockQuantity);
                    console.log("Unit price:" + stockPrice);
                    console.log("Unit quantity: " + requestedQuantity);
                    // console.log(requestedID);
                    // console.log("--------------------------------------------");
                    connection.query(
                        "UPDATE products SET ? WHERE ?", [{
                                stock_quantity: stockQuantity - requestedQuantity,
                                product_sales: stockSales + subtotal

                            },
                            {
                                item_id: requestedID
                            }
                        ],
                        function(err) {
                            if (err) throw err;
                            // console.log("Stock item ID: " + stockID);
                            // console.log("Stock item quantity:" + stockQuantity);
                            // console.log("Stock price:" + stockPrice);
                            // console.log("--------------------------------------------");
                        }
                    );
                    console.log("Total cost: " + subtotal);
                    console.log("--------------------------------------------");

                } else {
                    console.log("Insufficient quantity!");
                    console.log("--------------------------------------------");
                }

            });


        });
}