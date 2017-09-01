'use strict';

import Router from 'koa-router';
import signUp from '../model/userModel';
let router = new Router();

router.get('/',function	*(){
	yield this.render('home', {
  		title: "Home Page",
  		error: this.session.error
  	});
  	this.session.error = null;
});




export default router.routes();


