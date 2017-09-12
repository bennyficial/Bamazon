# bamazon

The objective is to use Node.js and MySQL to create an Amazon-like store front application. 

This application should should have 3 different views: Customer, Manager, and Supervisor.

Customer View- Take in a customer's order and deplete the stock's inventory. 

Manager View- Allow for a manager to view all products for sale, view products with low inventory, add more inventory to existing products on sale, add new products for sale. 

Supervisor View- Allow for a supervisor to view the profitablity of all departments as well as adding new departments. 

## Getting Started

- Run command in Terminal or Gitbash 'git clone https://github.com/bennyficial/bamazon.git'
- Run command in Terminal or Gitbash 'npm install'

### Setting up the Database
1. Open mySQL and connect to an existing local server or create a new one with the following values:
    * Connection Method: Standard (TCP/IP)
    * Port: 3306
    * Username: root
    * Password: root

2. Click Test Connection to confirm everything is working and hit connect.

3. Run the queries from the schema.sql file within your connection/query tab to create the database and tables

4. Run the queries from the seeds.sql file within your connection/query tab to populate the tables with sample data

### Testing each app
- Run the following command in Terminal or Gitbash depending on which "view" or app you would like to run:
	* Customer - 'node bamazonCustomer.js'
	* Manager - 'node bamazonManager.js'
	* Supervisor - 'node bamazonSupervisor.js'
- Run 'ctrl + c' to exit each mode

1. `bamazonCustomer.js`
	* Prompts user for the item ID of desired product

	* Prompts user for the quantity of desired product

	* After taking the order, will check the inventory:
		* If there is a sufficient amount of the product in stock, it notify the user that there stock and will complete the sales transaction:
			* Reduce stock of the desired product by the requested quantity 
			* Return the total price of the purchase
			* Update the product sales to reflect the sale

		* If there is not enough of the product in stock, it will notify the user of the insufficient quantity. 

2. `bamazonManager.js`	

    * Prompt with a menu for the Manager Actions:
        * View Products for Sale
        * View Low Inventory
        * Add to Inventory
        * Add New Product

    * If the manager selects `View Products for Sale`, it lists all of the products for sale       

    * If the manager selects `View Low Inventory`, it lists all the products with less than five items units in stock.

    * If the manager selects `Add to Inventory`, it allows the manager to select an existing product from a list and add additional units to the inventory.

    * If the manager selects `Add New Product`, it allows the manager to add a new product to the store.

3. `bamazonSupervisor.js`   

     * Prompt with a menu for the Supervisor Actions:
        * View Product Sales by Department
        * Create New Department

    * If the supervisor selects `View Product Sales by Department`, it lists the Cost and Sales for each Department and calculates the total profit from their difference. 

    * If the supervisor selects `Create New Department`, it allows the manager to create a new department and input current overhead costs and product sales. If there are none, by default it will set at 0.        

### Workflows
1. `bamazonCustomer.js`
User will first be shown a list of the available products for sale
![Product List](/cust1.PNG?raw=true)

User will then enter the ID of the product they wish to purchase
![Item ID](/images/cust2.png?raw=true)

User will then enter the amount of the product they wish to purchase and if there is sufficient inventory
![Item QtyT](/images/cust3.png?raw=true)
User is then shown the total cost of their purchase

If there is not enough inventory
![Alt QtyF](/images/cust3.png?raw=true)

## Technologies used
- Node.js
- Inquirer (https://www.npmjs.com/package/inquirer)
- MySQL Workbench
