const express = require('express');
let app = express();

let server = require('http').createServer(app);

server.listen('4001', () => console.log(`lsitening to port 4001`));

let pug = require('pug');
let path = require('path');

app.engine('pug', pug.__express);
app.set("view engine", "pug"); // pug as default template engine

app.set("views", path.join(__dirname, "public"));
app.use(express.static(path.join(__dirname, "public")));

const bodyParser = require('body-parser'); // handles HTTP POST request in Express.js 
app.use(bodyParser.urlencoded({	
	extended: true
}));
app.use(bodyParser.json());

let mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/google-top-free-apps', { useNewUrlParser: true,reconnectTries: Number.MAX_VALUE, // Never stop trying to reconnect
reconnectInterval: 1000, }).then(() => {
	console.log('connected');
}).catch((error) => {

	assert.isNotOk(error, 'Promise error');
	done();
});

app.get('/', (req, res) => {
	res.redirect('/app-listing');
});

let route = require('./controller/controller.router')(app, express);
app.use('/', route);