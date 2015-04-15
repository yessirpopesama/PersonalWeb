var express = require('express');
var router = express.Router();
var nodemail = require('nodemailer');
var Mail = require('../model/Mail');
var User = require('../model/User');

/* GET home page. */
router.get('/', function(req, res) {
	res.render('index', {
		title: 'Express',
		user: req.session.user
	});
});

router.post('/', function(req, res) {
	var username = req.body.username;
	var password = req.body.password;
	var passwordRe = req.body.passwordRe;
	var newUser = new User({
		name: username, 
		password: password, 
	});
	console.log(username);
	console.log(password);
	console.log(passwordRe);

	if (password !== passwordRe) {
		console.log('password not match');
		res.redirect('/');
	} else {
		newUser.save(function(err, user) {
			if (err) {
				return res.redirect('/');
			} else {
				req.session.user = user;
				return res.redirect('/');
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