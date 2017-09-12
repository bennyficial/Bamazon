# bamazon

The ojective is to use Node.js and MySQL to create an Amazon-like store front application. 

## Getting Started

- Clone repo.
- Run command in Terminal or Gitbash 'npm install'
- Run command in Terminal or Gitbash 'git clone https://github.com/bennyficial/bamazon.git'

### Setting up the Database
1. Open mySQL and connect to an existing local server or create a new one with the following values:
    * Connection Method: Standard (TCP/IP)
    * Port: 3306
    * Username: root
    * Password: root

2. Click Test Connection to confirm everything is working and hit connect.

3. Run the queries from the schema.sql file within your connection/query tab to create the database and tables

4. Run the querires from the seeds.sql file within your connection/query tab to populate the tables with sample data

### Testing each app

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