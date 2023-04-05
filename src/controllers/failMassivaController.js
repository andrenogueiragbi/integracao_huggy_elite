const dataClient = require('../modals/PointAcess')
const dataMAssiva = require('../modals/attendanceMassiva')
const isFail = require('../controllers/comparePointAcess')



module.exports = {
    async haveMassiva(req, res) {
        const { codcli } = req.body;


        if (!codcli || !Number(codcli)) {    // VERIFICA SE TEM PARAMETRO CORRETOS NO USUÁRIO
            return res.status(400).send({
                ok: false,
                message: 'codcli not define or not is numeric'
            });
        }


        try {

            resultFailMassiva = await dataMAssiva()

            if (!resultFailMassiva.ok) {
                return res.status(500).send({
                    ok: false,
                    message: resultPontAccess.message,

                })
            }


            if (resultFailMassiva.length === 0) {
                return res.status(200).send({
                    ok: true,
                    fail: false
                })
            }


            resultPontAccess = await dataClient(codcli)

            if (!resultPontAccess.ok) {
                return res.status(500).send({
                    ok: false,
                    message: resultPontAccess.message,

                })
            }


            if (resultPontAccess.dataDB.length === 0) {
                return res.status(200).send({
                    ok: true,
                    fail: false,
                    pointAccess: resultPontAccess.dataCli,
                })
            }

            pontoAcessCLI = []
            pontoFailMCK = []
            pontoFailMCK_String = ""


            // PEGANDO O PONTO DE ACESSO QUE O CLIENTE FAZ PARTE
            for (let i in resultPontAccess.dataDB) {
                pontoAcessCLI.push(resultPontAccess.dataDB[i].nome_con.toUpperCase())
            }

            // PEGANDO O PONTO DE ACESSO QUE ESTÃO COM FALHA
            for (let i in resultFailMassiva.dataDB) {
                pontoFailMCK_String += `${resultFailMassiva.dataDB[i].descri_oco},`
            }

            for (let i of pontoFailMCK_String.split(',')){
                if(i != ""){
                    pontoFailMCK.push(i.trim().toUpperCase())
                }    
            }

            isFail(pontoAcessCLI,pontoFailMCK)

            return res.status(200).send({
                ok: true,
                fail: isFail(pontoAcessCLI,pontoFailMCK),
                pontoAcessCLI,
                pontoFailMCK
                

            })

        } catch (error) {
            return res.status(500).send({
                ok: false,
                message: 'The server failed',
                error
            });
        }
    }
}
