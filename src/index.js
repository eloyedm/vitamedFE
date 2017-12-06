var express = require('express');
var app = express()
var bodyParser = require('body-parser');
var serveStatic = require('serve-static');
var cookieParser = require('cookie-parser');
var unirest = require('unirest')
var fs = require('fs');

// var serviceHost = 'http://vitamedbe.local';
var serviceHost = 'http://vitalmed.xyz:8080';

app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(cookieParser());
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

app.get('/welcome', function(req, res){
  res.sendFile(__dirname +'/views/Onboarding.html');
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
  validateSession(req.cookies, function(data){
    if(data){
      res.sendFile(__dirname +'/views/VerCitas.html');
    }else{
      res.redirect('/');
    }
  });
})

app.get('/recordatorios', function(req, res){
  validateSession(req.cookies, function(data){
    if(data){
      res.sendFile(__dirname +'/views/Recordatorios.html');
    }else{
      res.redirect('/');
    }
  });
});

app.get('/configuracion', function(req, res){
  validateSession(req.cookies, function(data){
    if(data){
      res.sendFile(__dirname +'/views/Configuracion.html');
    }else{
      res.redirect('/');
    }
  });
});

app.get('/nueva', function(req, res){
  validateSession(req.cookies, function(data){
    if(data){
      res.sendFile(__dirname +'/views/NuevaCita.html');
    }else{
      res.redirect('/');
    }
  });
});

app.get('/home', function(req, res){
  validateSession(req.cookies, function(data){
    if(data){
      res.sendFile(__dirname + '/views/Dashboard.html');
    }else{
      res.redirect('/');
    }
  });
})

app.get('/test', function(req, res){
  validateSession(req.cookies, function(data){
    if(data){
      res.sendFile(__dirname + '/views/Dashboard.html');
    }else{
      res.redirect('/login');
    }
  });
})

function validateSession(data, callback){
  unirest.post(serviceHost+'/services/validate')
  .field('user', data.username)
  .field('token', data.sessionToken)
  .end(function(res) {
    if (res.error) {
      callback(false);
    } else {
      callback(true);
    }
  })
}
