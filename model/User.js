var crypto = require('crypto');
var mysql = require('mysql');
var id = 0;
// DBINFO CONST
var DBINFO = {
	_HOST: 'localhost',
	_USER: 'root',
	_PASSWORD: '',
	_DATABASE: 'fruitdb',
	_PORT: 3306
};

// db connection info
var pool = mysql.createPool({
	host: DBINFO._HOST,
	user: DBINFO._USER,
	port: DBINFO._PORT,
	password: DBINFO._PASSWORD,
	database: DBINFO._DATABASE
});

function User(user) {
	this.name = user.name;
	this.password = user.password;
}

module.exports = User;

User.prototype.save = function(callback) {
	var password = this.password;
	var md5 = crypto.createHash('md5');
	var pwdDigest = md5.update(password).digest('hex');
	var me = this;
	console.log('pwd: ' + pwdDigest);

	var userAddSql = 'INSERT INTO user SET ?';
	// var userParams = [userInfo.id, userInfo.name, userInfo.password];
	var userParamas = {
		id: this.id,
		name: this.name,
		password: pwdDigest
	}

	pool.getConnection(function(err, connection) {
		// connection query
		connection.query(userAddSql, userParamas, function(err, result) {
			if (err) {
				conneciton.release();
				return callback(err);
			} else {
				me.id++;
				connection.release();
				return callback(null, userParamas);
			}
		});
	});
}

User.prototype.getOne = function(callback) {
	var user = {
		name: this.name,
		password: this.password
	}

}

// User.prototype.save = function(callback) {
// 	var pwd = this.password;
// 	var md5 = function(str, encoding) {
// 		return crypto.update(str).digest(encoding || 'hex');
// 	}
// 	var salt = md5(Date.now().toString());
// 	pwd = md5(salt + '-' + pwd); 

// 	var user = {
// 		name: this.name,
// 		password: pwd,
// 		totScore: this.totScore
// 	}

// 	// mongodb.

// }