const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session'); 

require('dotenv').config();

var pool = require('./modelo/bd');


const indexRouter = require('./routes/index');
const bathRouter = require('./routes/bath');
const chatRouter = require('./routes/chat');
const homedecoRouter = require('./routes/homedeco');
const kitchenRouter = require('./routes/kitchen');
const loginRouter = require('./routes/login');
const outdoorRouter = require('./routes/outdoor');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//select
pool.query("select * from empleados").then(function(resultados){
  console.log(resultados);
});

//insert
var objInsert = { 
  nombre: 'Juan',
  apellido: 'Lopez',
  trabajo: 'Docente',
  edad: 38,
  salario: 190000,
  mail: 'juanlopez@gmail.com'
}

pool.query("insert into empleados set ?", [objInsert]).then(function(resultados) {
  console.log(resultados);
});

//update
var idUpdate = 1;
var objUpdate = {
  nombre: 'Pablo',
  apellido: 'Gomez'
}

pool.query("update empleados set ? where id_emp=?", [objUpdate, idUpdate]).then(function(resultados){
  console.log(resultados);
});


//delete
var idDelete = 3;

pool.query("delete from empleados where id_emp = ?", [idDelete]).then(function(resultados){
  console.log(resultados);
});




app.use(session({
  secret: 'utn2023',
  resave: false,
  saveUninitialized: true
}));

app.use('/', indexRouter);
app.use('/bath', bathRouter);
app.use('/chat', chatRouter);
app.use('/homedeco', homedecoRouter);
app.use('/kitchen', kitchenRouter);
app.use('/login', loginRouter);
app.use('/outdoor', outdoorRouter);


app.use((req, res, next) => { 
  res.locals.user = req.session.user; 
  next();
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
