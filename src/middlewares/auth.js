const bcrypt = require('bcryptjs');
const User = require('../modals/User');
const Log = require('../modals/Log');
const Ip = require('../modals/Ip');
const log = require('./logAcess')
const print = require('../controllers/print');



module.exports = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    const {ip ,source_port,destinatioPort,route,hour} = log(req, res)

    try{
        ipCheck = await Ip.findOne({ where: { ip } })

        if(!ipCheck){
            print(`${hour}: - ${ip}:${source_port}  - ${destinatioPort}${route} - IP Unauthorized`, 'ERRO')

            await Log.create({ token:'ip unauthorized ',ip ,source_port,route,status:"401 Unauthorized" })
            return res.status(401).send({
                erro: true,
                message: `The origin of ${ip} unauthorized, we will know that`
            }); 
        }

    }catch(error){
        return res.status(500).send({
            ok: false,
            message: 'The server failed(IPS)',
            error
        });

    }

    




    if (!authHeader) {
        return res.status(401).send({
            erro: true,
            message: 'No token provider'
        });
    }
    const parts = authHeader.split(' ');

    if (!parts.length == 2) {
        return res.status(401).send({
            erro: true,
            message: 'Token error!'
        });
    }

    const [scheme, token] = parts;

    if (!/^Bearer$/i.test(scheme)) {
        return res.status(401).send({
            erro: true,
            message: 'Token malFormatted'
        });
    }

    

    try {
        const user = await User.findOne({ where: { token } })
        
        

        if (!user) {
            print(`${hour}: - ${ip}:${source_port}  - ${destinatioPort}${route} - 401 Unauthorized`, 'ERRO')    
            await Log.create({ token,ip ,source_port,route,status:"401 Unauthorized" })

            return res.status(401).send({
                erro: true,
                message: 'Token invalid'
            }); 

        }

        print(`${hour}: - ${ip}:${source_port}  - ${destinatioPort}${route} - 200 OK ${token.split('-')[0]}`, 'ALERT')
        await Log.create({ token,ip ,source_port,route,status:"200 OK" })

        return next();


    } catch (error) {
        return res.status(500).send({
            ok: false,
            message: 'The server failed(middlewares)',
            error
        });

    }

};