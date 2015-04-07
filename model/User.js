var crypto = require('crypto');
var id = 1;

function User(user) {
	this.name = user.name;
	this.password = user.password;
	this.passwordRe = user.passwordRe;
}

User.prototype.save = function(callback) {
	var password = this.password;
	// password security process
	password = function(password) {
		var salt = crypto.update(Date.now().toString()).digest('hex');
		return crypto.update(salt + '-' + password).digest('hex');
	}
	var user = {
		name : this.name,
		password: password,
		id: this.id,
	}
	this.id++;
	// create mysql sentence
	var sentence = function(user) {
		return 'INSERT INTO ' + TEST_DATABASE + '(id, name, password) VALUES(\'' + user.id + '\',\'' + user.name + '\',\'' + user.password + '\');';
	}
	console.log(sentence);
	connection.query(sentence, function(err) {
		if (err) {
			console.log(err.error);
			callback(err);
		} else {
			console.log('save success');
			callback(null);
		}
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
