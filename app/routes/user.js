'use strict';

import Router from 'koa-router';
import nodemailer from 'nodemailer'
import signUp from '../model/userModel';


let router = new Router();
let passport = require('koa-passport');
let LocalStrategy = require('passport-local').Strategy

passport.serializeUser(function(user, done) {
	done(null, user);
});
passport.deserializeUser(function(user, done) {
	done(null, user);
});

passport.use(new LocalStrategy({usernameField: 'email',passwordField: 'password'},
  function(email, password, done) {
  	let adminEmail = "paulfox";
  	let adminPass = "sajulan";
  	let emailVerify = "1";
  	let userlevel = "admin";
	  	if (email == adminEmail && password == adminPass) {
	  		signUp.adminData.count({}, function (err, count){ 
			    if(count>0){
			       signUp.adminData.findOne({ useremail: adminEmail, userpassword: adminPass }, done);
			    }else {
			    	let createAdmin = new signUp.adminData ({
							useremail: adminEmail,
							userpassword: adminPass,
							userlevel: userlevel,	
							userverify:	emailVerify				
						});
							createAdmin.save(function(){
								signUp.adminData.findOne({ useremail: adminEmail, userpassword: adminPass }, done);
							});	
			    }
				}); 
	  	}else {
	  		signUp.userData.findOne({ useremail: email, userpassword: password }, done);
	  	}
  }
));

router.post('/findemail',function *(){
	let kani = this.request.body.email;
	let ambot = yield signUp.userData.find({useremail : kani}).exec();
	if (ambot == ""){
		this.body=  "naa";
	}else{
		this.body = kani;
	}
});

router.post('/sign-up',function	*(){
	let randomString = function(length) {
		let text = "";
		let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
		  for(let i = 0; i < length; i++) {
		    text += possible.charAt(Math.floor(Math.random() * possible.length));
		  }
		  return text;
		}
	let vcode = randomString(5);

	let transporter = nodemailer.createTransport({
  	service: 'Gmail',
    	auth: {
      	user: 'herpaul09@gmail.com',
      	pass: '143sajulan143'
    	}
    });

	let mailOptions = {
  	from: 'Herpaul Sajulan <herpaul09@gmail.com>',
  		to: this.request.body.txtemail,
        subject: 'Verification code',
        	text: "Thank you for signing up. " + "\r\n" + "Here is your code :" + " " + vcode,
  	}

	let newaccout = new signUp.userData ({
		userfname: this.request.body.txtfname,
		userlname: this.request.body.txtlname,
		useremail: this.request.body.txtemail,
		userpassword: this.request.body.txtpass,
		userskill: this.request.body.slctskill,
		usergender: this.request.body.slctgender,
		userverify:	vcode								
	});
	newaccout.save();
	transporter.sendMail(mailOptions)

	this.body = "Successfully Registered";
	
});

router.post('/login', passport.authenticate('local', {
	successRedirect: '/check-user',
	failureRedirect: '/errorLogin'
}));

router.get('/errorLogin', function *(){
	this.session.error = "Invalid account information";
	this.redirect('/')
});

router.get('/logout', function *(){
	if (this.session.passport.user.userlevel == "admin"){
		signUp.adminData.remove({ useremail : this.session.passport.user.useremail}).exec();
	   	this.logout()
			this.redirect('/')
	}else {
		this.logout()
		this.redirect('/')
	}
});

router.get('/check-user', function *(){
	let verification = this.session.passport.user.userverify;
		if (verification == "1"){
			this.redirect('/chat')
				if (this.session.passport.user.userlevel == "admin"){
					this.redirect('/admin')
				}
		}else {
			this.redirect('/email-varification')
		}	
});

router.get('/email-varification', function *(){
	yield this.render('verify', {
  		title: "verify Page"
  	});
});
export default router.routes();


