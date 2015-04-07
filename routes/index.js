var express = require('express');
var router = express.Router();
var nodemail = require('nodemailer');
var Mail = require('../model/Mail');
var User = require('../model/User');

/* GET home page. */
router.get('/', function(req, res) {
	res.render('index', {
		title: 'Express'
	});
});

router.post('/', function(req, res) {
	var username = req.body.username;
	var password = req.body.password;
	var passwordRe = req.body.passwordRe;
	var newUser = {
		name: username, 
		password: password, 
	}
	console.log(username);
	console.log(password);
	console.log(passwordRe);

	if (password !== passwordRe) {
		console.log('password not match');
		res.redirect('/');
	} else {
		var user = new User();
		user.save(username, password, function(saveCode) {
			/*
			 * saveCode:
			 * 1 already exist in the datebase
			 * 2 save error
			 * 3 save success
			 */
			if (saveCode === 1) {
				console.log('already exist in the datebase');
			} else if (saveCode === 2) {
				console.log('save error');
			} else if (saveCode === 3) {
				req.session.user = user;
				console.log('save success');
			}
		})
	}



});

router.get('/gameList', function(req, res) {
	res.render('games');
});

router.get('/dragball', function(req, res) {
	res.render('dragball');
});


// router.get('/scorelist', function(req, res) {
// 	res.render('scoreList', {

// 	});
// })
module.exports = router;