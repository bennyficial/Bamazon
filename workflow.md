### Workflows
1. `bamazonCustomer.js`
User will first be shown a list of the available products for sale and then be prompted to enter the ID of the product they wish to purchase
![Product List](/images/cust1.PNG?raw=true)

    * User will then enter the amount of the product they wish to purchase
    ![Item ID](/images/cust2.PNG?raw=true)

        * If there is sufficient inventory  
        ![Item QtyT](/images/cust3.PNG?raw=true)

        * If there is not enough inventory  
        ![Alt QtyF](/images/cust4.PNG?raw=true)

2. `bamazonManager.js`
User will first be shown a list of the available actions
![Manager List](/images/man1.PNG?raw=true)

    * Choosing VIEW PRODUCTS FOR SALE will show the following
    ![Product List](/images/man2.PNG?raw=true)

    * Choosing VIEW LOW INVENTORY will show the following 
    ![Low List](/images/man3.PNG?raw=true)

    * Choosing ADD TO INVENTORY will show the following 
    ![Add Stock](/images/man4.PNG?raw=true)

    * User uses up and down arrows to navigate and spacebar to select item, then enter to submit
    ![Add Stock List](/images/man5.PNG?raw=true)

    * User specifies how many units they wish to add
    ![Add Stock Qty](/images/man6.PNG?raw=true)

    * User gets a confirmation of the stock being updated
    ![Add Stock Qty](/images/man7.PNG?raw=true)

    * Choosing ADD NEW PRODUCT will prompt the user to specify the new product
    ![Add Item](/images/man8.PNG?raw=true)

    * User will use up and down arrows to navigate and enter to select the department from the list
    ![Add Item Dept](/images/man9.PNG?raw=true)

    * User will specify the pricing of the new product
    ![Add Item Price](/images/man10.PNG?raw=true)

    * User will specify the inventory of the new product
    ![Add Item Qty](/images/man11.PNG?raw=true)

    * User gets a confirmation of the new product being added
    ![Add Item Confirm](/images/man12.PNG?raw=true) 

3. `bamazonSupervisor.js`
User will first be shown a list of the available actions
![Supervisor List](/images/sup1.PNG?raw=true)

    * Choosing VIEW PRODUCT SALES BY DEPARTMENT will show the following
    ![Product List](/images/sup2.PNG?raw=true)

    * Choosing CREATE NEW DEPARMTENT will prompt the user for the name of the new department
    ![Product List](/images/sup3.PNG?raw=true)  

    * User will then be specify the overhead cost of the new department
    ![Product List](/images/sup4.PNG?raw=true)  

    * User gets a confirmation of the new department being added
    ![Add Item Confirm](/images/sup5.PNG?raw=true)    