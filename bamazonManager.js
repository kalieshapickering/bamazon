//Dependencies 
var mysql = require("mysql");
var inquirer = require("inquirer");

//connection to mysql database
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "root",
    database: "bamazon_db",
});

connection.connect(function (err) {
    if (err) {
        console.error("error connecting: " + err.stack);
        return;
    }
    console.log("connected as id " + connection.threadId);
});

function start() {
    inquirer
    prompt(
        {
            name: "Task",
            type: "rawlist",
            message: "What task would you like to perform?",
            choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product"]
    }).then(function(answer){

    })
};
start();

function viewProducts() {
    console.log("Selecting all products...\n");
    connection.query("SELECT * FROM products", function(err, res) {
      if (err) throw err;
      // Log all results of the SELECT statement
      console.log(res);
      connection.end();
    });
}

function lowInventory() {

};

function addInventory() {
 
};

function newProduct() {
    console.log("Inserting a new product...\n");
    var query = connection.query(
      "INSERT INTO products SET ?",
      {
        product_name: ,
        department_name: ,
        price: ,
        stock_quantity: 
      },
      function(err, res) {
        console.log(res.affectedRows + " product inserted!\n");
        // Call viewProducts AFTER the INSERT completes
        viewProducts();
      }
    );
  
    // logs the actual query being run
    console.log(query.sql);
}