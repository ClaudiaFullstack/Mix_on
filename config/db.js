var mysql = require('../node_modules/mysql');
var connection = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : 'root',
    database : 'mix_on',
});

connection.connect(
    function (error){
        if (error){
            throw error;
        }
        else{
            console.log("conexion con BD correcta");
        }
    }
);

module.exports = connection;
