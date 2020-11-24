var express = require("express");
var mysql = require("mysql");
// var jwt = require("jwt");


var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));


//database connection
var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database:'dzair'
});


connection.connect(function(err) {
    if (err) {
        console.error('Database connection failed: ' + err.stack);
        return;
    }
    console.log('Connected to database.');
});

// connection.end();

// server creation
var port = process.env.PORT || 3000;

var server = app.listen(port,function(){
    var host = server.address().address
    var port = server.address().port

    console.log('Server running .. listening at' + port + '/');
});
app.use(express.static('public'));


//====================================
// rest services
//====================================

app.get('/spots',function(req,res) {  
    var query = "select * from spots join image"; 
    connection.query(query,function(error,results){
        if (error) throw error;
        res.send(JSON.stringify(results));
    })
});


//retrieve all cateogries
app.get('/categories',function(req,res){  
    var query = "select * from category"; 
    connection.query(query,function(error,results){
        if (error) throw error;
        res.send(JSON.stringify(results));
    })
});

//get Category by id
app.get('/categories/:id',function(req,res){  
    var query = "select * from category where id = " + req.params.id; 
    connection.query(query,function(error,results){
        if (error) throw error;
        res.send(JSON.stringify(results));
    })
});

app.post('/auth',function(req,res){  
    var query = "select * from user where username = '" + req.body.username + "' AND password = '" + req.body.password + "'"; 
    connection.query(query,function(error,results){
        if (error) throw error;
        if(results.length) {
            res.send(JSON.stringify(results[0].id));
        } else {
            res.send(401);
        }
    })
});