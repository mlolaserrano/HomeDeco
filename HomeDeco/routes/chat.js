var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');

// Agrega estas líneas para configurar body-parser
var bodyParser = require('body-parser');
var app = express();

app.use(bodyParser.urlencoded({ extended: false }));

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('chat', { title: 'Express' });
});

router.post('/', async (req, res, next) => {
  console.log(req.body);
  var email = req.body.email;
  var mensaje = req.body.mensaje;

  var obj = {
    to: 'mlolaserrano@gmail.com',
    subject: 'Contacto desde la Web',
    html: email + " Envió el siguiente mensaje: " + mensaje
  }

  var transport = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    }
  });

  var info = await transport.sendMail(obj);

  res.render('chat', {
    message: 'Mensaje enviado correctamente',
  });
});

module.exports = router;