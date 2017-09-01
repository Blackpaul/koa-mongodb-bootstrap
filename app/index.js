'use strict';

import koa from 'koa';
import handlebars from 'koa-handlebars';
import serve from 'koa-static';
import parser from 'koa-body-parser';
import session from 'koa-session';
import MongoStore from 'koa-generic-session-mongo';


//import pages
import admin from './routes/admin';
import home from './routes/home';
import about from './routes/about';
import user from './routes/user';
import chat from './routes/chat';

const passport = require('koa-passport')

let app = new koa(); 

app.use(parser());
app.use(serve('./app/public'));

app.keys = ['some secret hurr'];
app.use(session(app,{
	store: new MongoStore()
}));

app.use(passport.initialize())
app.use(passport.session())

app.use(handlebars({
	viewsDir: './app/views',
	layoutsDir: './app/layouts',
	partialsDir: './app/views/partial',
	defaultLayout: 'main'
}));

app.use(function *(next) {
    yield next;
	    if (this.status === 404) {
	        this.body = 'invalid page';
	    }
});

app.use(admin);
app.use(home);
app.use(about);
app.use(chat);
app.use(user);


app.listen(3000);
console.log('naa sa 3000');
