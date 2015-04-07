/*********** Const Create ***************/
var mysql = require('mysql');
var _HOST = 'localhost';
var _USER = 'root';
var _PASSWORD = '';
var TEST_DATABASE, connection;
var TEST_TABLE = 'User';
var me = this;


function DataBase(dbName) {
    TEST_DATABASE = dbName;
}

module.exports = DataBase;

// mysql basedata connection
DataBase.prototype.connect = function() {
    connection = mysql.createConnection({
        host: _HOST,
        user: _USER,
        password: _PASSWORD,
    });
    connection.connect(function(err) {
        if (err) {
            console.log(err);
        } else {
            console.log('connection success');
        }
    });
}

// mysql basedata disconnection
DataBase.prototype.disconnect = function() {
    connection.end();
}

// mysql basedata createDb
DataBase.prototype.createDB = function() {
    var db = TEST_DATABASE;
    var sentence =  'CREATE DATABASE IF NOT EXISTS ' + db + ';';
    connection.query(sentence, function(err) {
        if (!err)
            console.log('Success');
        else {
            console.log('Error while performing Query.');
            console.log(err);
        }
    });
}

// DataBase.prototype.createTable = function() {
//     var table = 'User'
//     var sentence = 'CREATE TABLE IF NOT EXISTS ' + 
// }