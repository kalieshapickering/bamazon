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
    console.log("Displaying all products...\n");
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        // Log all results of the SELECT statement
        console.log(res);
        console.log("-------------------------");
        inquirer
            .prompt([{
                    name: "item",
                    type: "rawlist",
                    message: "What product would you like to purchase from Bamazon?",
                    choices: ["Nikon D3300", "Samsung Ultrabook", "Eloquent JavaScript", "LG Microwave", "Captian Crunch Cereal", "Marc Anthony Coconut Oil Body Lotion", "Smashbox Liquid Lipstick Rouge", "Vera Wang Duvet Cover", "Spalding Basketball", "Milk Bone Dog Treats"]
                },
                {
                    name: "amount",
                    type: 'input',
                    message: "How many would you like to purchase?",
                    validate: function (value) {
                        if (isNaN(value) === false) {
                            return true;
                        }
                        return false;
                    }
                }
            ]).then(function (answer) {
                var itemToBuy;
                for (var i = 0; i < results.length; i++) {
                    if (results[i].item_id === parseInt(answer.item)) {
                        itemToBuy = results[i];
                    }
                }
                if (itemToBuy.stock_quantity > parseInt(answer.amount)) {

                    var total = itemToBuy.price * parseInt(answer.amount);


                    connection.query(
                        "UPDATE products SET ? WHERE ?",
                        [{
                                stock_quantity: itemToBuy.stock_quantity - parseInt(answer.amount)
                            },
                            {
                                item_id: itemToBuy.item_id
                            }
                        ],

                        function (error) {
                            if (error) throw err;
                            console.log("Your order was placed succesfully!");
                            console.log("-----------------------");
                            console.log("Your total is: $" + total.toFixed(2))

                        }
                    )
                } else {

                    console.log("Sorry, we currently do not have enough stock, try back later!")
                    start();
                }

            })
    })

};
start();