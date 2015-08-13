var express = require('express')
var morgan = require('morgan');
var serveStatic = require('serve-static')
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var uuid = require('node-uuid');

var app = express()
app.use(morgan('combined'))

// deprecated
// app.use(bodyParser());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

app.use(methodOverride());
app.use(serveStatic(__dirname + '/prod'))
//app.use(serveStatic(__dirname + '/public'))

var router = express.Router();

// recipe api
var recipes = [{
    id: "f588d038-0cfd-4e4b-add7-959c332081bc",
    userid: "ghqf0d90-306e-11e5-80b5-5b0f99bb025c",
    title: "Cheese Omelette",
    new: true
}, {
    id: "f588d038-0cfd-4e4b-add7-959c332081bc",
    userid: "jaaf0d90-306e-11e5-80b5-5b0f99bb025c",
    title: "Mushroom Omelette",
    new: true
}, {
    id: "f588d038-0cfd-4e4b-add7-959c332081bc",
    userid: "6eaf0d90-306e-11e5-80b5-5b0f99bb025c",
    title: "Baked Beans on Toast",
    new: true
}, {
    id: "5503b3f0-306e-11e5-8a3f-abf51e86c8d3",
    userid: "6eaf0d90-306e-11e5-80b5-5b0f99bb025c",
    title: "French Toast",
    new: false
}, {
    id: "5ff02e60-306e-11e5-b55a-9f922d0a88e3",
    userid: "8db40830-306e-11e5-8d94-ef4b65a47e73",
    title: "Rocky Mountain Egg",
    new: false
}, ];

router.get('/recipes', function (req, res) {
    res.send(recipes);
});

router.post('/recipes', function (req, res) {
    var recipe = req.body;
    recipe.id = uuid.v1();
    recipes.push(recipe);
    res.send(recipe);
})

// user api
var users = [{
    id: "6eaf0d90-306e-11e5-80b5-5b0f99bb025c",
    email: 'victorkane@example.com',
    name: 'Victor Kane',
    password: '123456'
}, {
    id: "78fde870-306e-11e5-879d-bfbdfa9b6181",
    email: 'henry@example.com',
    name: 'Henry James',
    password: 'abcdefg'
}, {
    id: "82ec7ae0-306e-11e5-9e68-b16f938f45e2",
    email: 'mary@example.com',
    name: 'Mary McArthur',
    password: '11111111'
}, {
    id: "8db40830-306e-11e5-8d94-ef4b65a47e73",
    email: 'judy@example.com',
    name: 'Judy Cromwell',
    password: 'fido'
}, ];

router.get('/users', function (req, res) {
    res.send(users);
});

router.post('/users', function (req, res) {
    var user = req.body;
    user.id = uuid.v1();
    users.push(user);
    res.send(user);
})

app.use('/api', router);

var url = process.env.IP || '0.0.0.0'
var port = 3000;
app.set('port', process.env.PORT || port)

var server = app.listen(app.get('port'), url, function () {
    console.log('Static server listening url %s on port %s', url, server.address().port);
})
