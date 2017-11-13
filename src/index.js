var express = require('express');
var app = express()
var bodyParser = require('body-parser');
var serveStatic = require('serve-static')
var fs = require('fs');

app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));
app.use('/static', serveStatic('public'));


app.listen(8001, function(){
  console.log('listening on *:8001');
})

app.get('/', function(req, res){
  res.sendFile(__dirname +'/views/Home.html');
})

app.get('/login', function(req, res){
  res.sendFile(__dirname +'/views/login.html');
})

app.get('/signin', function(req, res){
  res.sendFile(__dirname +'/views/SignIn.html');
})

app.get('/quienes-somos', function(req, res){
  res.sendFile(__dirname +'/views/QuienesSomos.html');
})

app.get('/descubre', function(req, res){
  res.sendFile(__dirname +'/views/Descubre.html');
})

app.get('/contacto', function(req, res){
  res.sendFile(__dirname +'/views/Contacto.html');
})

app.get('/citas', function(req, res){
  res.sendFile(__dirname +'/views/VerCitas.html');
})

app.get('/recordatorios', function(req, res){
  res.sendFile(__dirname +'/views/Recordatorios.html');
})

app.get('/nueva', function(req, res){
  res.sendFile(__dirname +'/views/NuevaCita.html');
})
