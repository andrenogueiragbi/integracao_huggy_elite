const express = require('express');
const authMiddleware = require('./middlewares/auth');
const routes = express.Router();
const online = require('./view/index')
const user = require('./controllers/userController')
const isclient = require('./controllers/clientController')
const haveMassiva = require('./controllers/failMassivaController')
const attendanceCheck = require('./controllers/AttendanceController')
const pixIndividual = require('./controllers/pixController')
const boleto = require('./controllers/boletoController')
const boletoIndividual = require('./controllers/boletoControllerIndividual')
const massiveFail = require('./controllers/massiveFail');
const invoice = require('./controllers/invoicePIX')



//ROTA NOVO USUARIO
routes.post('/user',authMiddleware, user.newUser);


//ROTA DE CHECAR A API SE ESTA ONLINE
routes.get('/online', online.pageStart);


//ROTA É CLIENTE?
routes.post('/isclient',authMiddleware,isclient.clientCheck);

//ROTA TEM INCIDENTE PONTO DE ACESSO?
routes.post('/haveFailMassiva',authMiddleware,haveMassiva.haveMassiva);

//ROTA CLIENTE TEM ATENDIMENTO ABERTO?
routes.post('/attendance',authMiddleware,attendanceCheck.attendanceCheck);

//ROTA FALHA MASSIVA
routes.post('/failure',authMiddleware,massiveFail.failCheck);

//ROTA GERAR PIX
routes.post('/generatePixIndividual',authMiddleware,pixIndividual.pixCheck);

//ROTA GERAR BOLETO
routes.post('/generateBoleto',authMiddleware,boleto.boletoCheck);

//ROTA GERAR BOLETO UNICO
routes.post('/generateBoletoIndividual',authMiddleware,boletoIndividual.boletoCheck);

//FATURA PIX MICKS
routes.post('/invoice',authMiddleware,invoice.allFat);

//FATURA PIX MICKS
routes.post('/invoicePIX',authMiddleware,invoice.fatPIX);



module.exports = routes;