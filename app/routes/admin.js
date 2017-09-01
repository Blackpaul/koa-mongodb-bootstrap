'use strict';

import Router from 'koa-router';
let router = new Router();

router.get('/admin', function *(){
	this.body = "admin";
});

export default router.routes();


