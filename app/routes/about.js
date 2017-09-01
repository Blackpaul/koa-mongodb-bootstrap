'use strict';

import Router from 'koa-router';
let router = new Router();

router.get('/about',function	*(){
	yield this.render('about', {
  		title: "About Us Page"
  	});
});

export default router.routes();


