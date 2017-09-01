'use strict';

import Router from 'koa-router';
let router = new Router();

router.use(function*(next) {
 	if (this.isAuthenticated()) {
 		yield next;
	} else {
 		this.redirect('/');
	}
})


router.get('/chat',function	*(){
	yield this.render('chat', {
  		title: "chat Page"
  	});
});

export default router.routes();


