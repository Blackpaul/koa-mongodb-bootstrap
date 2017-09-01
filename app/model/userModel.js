'use strict';

import mongoose from 'mongoose';
mongoose.connect('mongodb://localhost/community');

let Schema = mongoose.Schema;
let userDetailsSchema = new Schema({
			userfname: String,
			userlname: String,
			useremail: String,
			userpassword: String,
			userskill: String,
			usergender: String,
			userverify: String
		});
let userData = mongoose.model('users', userDetailsSchema);


let adminSchema = mongoose.Schema;
let adminDetailsSchema = new adminSchema({
			useremail: String,
			userpassword: String,
			userlevel: String,	
			userverify: String
		});
let adminData = mongoose.model('admin', adminDetailsSchema);

module.exports = {
	userData: userData,
	adminData: adminData
};

