const axios = require('axios');
require('dotenv').config()
const moment = require('moment')


const delay = ms => new Promise(resolve => setTimeout(resolve, ms))


module.exports = {
    async unlookPlanCli(codsercli) {

        const config = {
            method: 'post',
            url: 'http://127.0.0.1/integrator.server.php',
            headers: {
                'Content-Type': 'application/json'
            },
            data: {
                "request": {
                    "sendRequest": "integrator.server",
                    "method": "list",
                    "submethod": "habilitacaoProvisoria.execute",
                    "params": {
                        "_user": process.env.USER_API_ERP ,
                        "_passwd": process.env.PASSWD_API_ERP,
                        "codsercli": codsercli
                    }
                }
            }
        }

        try {
            let res = await axios(config);

            return {
                ok: true,
                message: res.data
            }

        } catch (erro) {

            return {
                ok: false,
                message: "Erro API elite"
            }
        }
    },
    async allFatCli(codcli) {

        const config = {
            method: 'post',
            url: 'http://127.0.0.1/integrator.server.php',
            headers: {
                'Content-Type': 'application/json'
            },
            data: {
                "request": {
                    "sendRequest": "integrator.server",
                    "method": "list",
                    "submethod": "faturas.cliente",
                    "params": {
                        "_user": process.env.USER_API_ERP,
                        "_passwd": process.env.PASSWD_API_ERP ,
                        "codcli": codcli,
                        "from": moment().subtract(45, 'days').format("YYYY-MM-DD"),
                        "to": moment().add(6, 'months').format("YYYY-MM-DD")
                    }
                }
            }
        }

        try {
            let res = await axios(config);

            return {
                ok: true,
                message: res.data
            }

        } catch (erro) {

            return {
                ok: false,
                message: "Erro API elite"
            }
        }
    },
    async allFatCliToDate(codcli,from,to) {
        

        const config = {
            method: 'post',
            url: 'http://127.0.0.1/integrator.server.php',
            headers: {
                'Content-Type': 'application/json'
            },
            data: {
                "request": {
                    "sendRequest": "integrator.server",
                    "method": "list",
                    "submethod": "faturas.cliente",
                    "params": {
                        "_user": process.env.USER_API_ERP,
                        "_passwd": process.env.PASSWD_API_ERP ,
                        "codcli": codcli,
                        "from": from ? from : moment().subtract(3, 'months').format("YYYY-MM-DD"),
                        "to": to ? to : moment().add(1, 'months').format("YYYY-MM-DD"),
                      
                    }
                }
            }
        }

        try {
            let res = await axios(config);

            return {
                ok: true,
                message: res.data
            }

        } catch (erro) {

            return {
                ok: false,
                message: "Erro API elite"
            }
        }
    },

    async getLinkCenterASS(codfat) {

        await delay(1000) // PARADA DO INTEGRATOR PARA EVITAR DUPLICIDADE o ERP TEM UMA FALHA


        const params = new URLSearchParams();

        params.append('method', `boleto`);
        params.append('param', codfat);
        params.append('server', `integrator_documents`);

        const config = {
            method: 'post',
            url: 'https://centraldoassinante.provedor.com.br/sites/all/files/paginas/getdoc.php',
            data: params,

        }

        try {


            let res = await axios(config);




            return {
                ok: true,
                message: "https://centraldoassinante.provedor.com.br/" + res.data.substring(6)
            }

        } catch (erro) {

            return {
                ok: false,
                message: "Erro API elite"
            }
        }

    },
    async getLinkPix(codfat) {
        const config = {
            method: 'post',
            url: 'http://127.0.0.1/integrator.server.php',
            headers: {
                'Content-Type': 'application/json'
            },
            data: {
                "request": {
                    "sendRequest": "integrator.server",
                    "method": "list",
                    "submethod": "fatura.getPix",
                    "params": {
                        "_user": process.env.USER_API_ERP,
                        "_passwd": process.env.PASSWD_API_ERP ,
                        "codfat": codfat
                    }
                }
            }
        }


        try {


            let res = await axios(config);




            return {
                ok: true,
                message: res.data
            }

        } catch (erro) {

            return {
                ok: false,
                message: "Erro API elite"
            }
        }

    },
    async allFatCliOpen(codcli) {

        const config = {
            method: 'post',
            url: 'http://127.0.0.1/integrator.server.php',
            headers: {
                'Content-Type': 'application/json'
            },
            data: {
                "request": {
                    "sendRequest": "integrator.server.php",
                    "method": "list",
                    "submethod": "view.execute",
                    "params": {
                        "_consulta": "003SELF",
                        "_user": process.env.USER_API_ERP,
                        "_passwd": process.env.PASSWD_API_ERP ,
                        "codcli": codcli,
                    }
                }
            }
        }

        try {
            let res = await axios(config);

            return {
                ok: true,
                message: res.data
            }

        } catch (erro) {

            return {
                ok: false,
                message: "Erro API elite"
            }
        }
    },

}
