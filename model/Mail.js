var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');
var me = this;

function Email(to, subject, text) {
	this.from = '515310301@qq.com';
	this.to = to;
	this.subject = subject;
	this.text = text;
}

Email.prototype.send = function(callback) {
	// host config
	var hostConfig = {
		host: 'smtp.qq.com',
		port: 465,
		secureConnection: true,
		auth: {
			user: "515310301@qq.com",
			pass: "beihong3(2)22"
		}
	}
	// send mail option
	var mailOptions = {
		from: this.from,
		to: this.to,
		subject: this.subject,
		text: this.text
	}

	console.log(mailOptions);

	var transport = nodemailer.createTransport(smtpTransport(hostConfig));

	// send mail with defined transport object  
	transport.sendMail(mailOptions, function(error, response) {
		if (error) {
			callback(error)
		} else {
			console.log("Message sent: " + response.message);
			callback(null);
		}
		// if you don't want to use this transport object anymore, uncomment following line  
		//smtpTransport.close(); // shut down the connection pool, no more messages  
	});
}

module.exports = Email;