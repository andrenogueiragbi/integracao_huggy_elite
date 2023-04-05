const validator = require('./Formatcpf_cnpj');
const dataClient = require('../modals/Client')
const {unlookPlanCli} = require('./IntegratorControllerAPI')
const print = require('../controllers/print');

module.exports = {
    async clientCheck(req, res) {
        const { cpfcnpj } = req.body;

        if (!cpfcnpj || cpfcnpj.length < 11) {    // VERIFICA SE TEM PARAMETRO CORRETOS NO USUÁRIO
            print(`>>> CLIENTE DIGITOU MENOS CARACTERES: ${cpfcnpj}`,'ERRO')
            return res.status(200).send({
                ok: false,
                cpf_or_cnpj:cpfcnpj,
                message: 'cpfcnpj not define or too small'
            });
        }

        const result_cpf_cnpj = validator(cpfcnpj);     //VALIDANDO FORMATO DE CPF OU CNPJ ENVIADO

        if (!result_cpf_cnpj.ok) {               // VERIFICA QUANDO O CPF  OU CNPJ  NÃO ESTA NO FORMATO CORRETO
            print(`>>> CLIENTE DIGITOU INVÁLIDO: ${cpfcnpj}`,'ERRO')
            return res.status(200).send({
                ok: false,
                cpf_or_cnpj:cpfcnpj,
                message: result_cpf_cnpj.message
            });
        }

        const result_dataClient = await dataClient(result_cpf_cnpj.cpf_or_cnpj)   //CONULTANDO NO BANDO DE DADOS DO INTEGRATOR


        if(!result_dataClient.ok){  //VERIFICA QUANDO O BANCO DE DADOS DE ERRO
            print(`>>> FALHA NO SERVIDOR: ${cpfcnpj}`,'ERRO')
            return res.status(500).send({
                ok: false,
                message: result_dataClient.message
            });       
        }



        if(result_dataClient.dataDB.length == 0){  //VERIFICA SE E CLIENTE DENTRO DA BASE
            print(`>>> CLIENTE NÃO IDENTIFICADO: ${cpfcnpj}`,'ERRO')
            return res.status(200).send({
                ok: true,
                client: false,
                type: result_cpf_cnpj.type,
                cpf_or_cnpj: result_cpf_cnpj.cpf_or_cnpj,
            });       
        }

        print(`>>> CLIENTE IDENTIFICADO: ${result_dataClient.dataDB[0].nome_cli}`,'ALERT')

        let unlookPlan = false

        for(let i of result_dataClient.dataDB){


            if(i.codest == "020IU10JW1"){

                resultunlook = await unlookPlanCli(i.codsercli)

                if(!resultunlook.message.error){
                    print(`PLANO DESBLOQUEADO: CLIENTE ${i.nome_cli} PLANO ${i.descri_ser}`,'ALERT')
                    unlookPlan = true
                }else{
                    unlookPlan = false
                    print(`FALHA EM DESBLOQUEAR: CLIENTE ${i.nome_cli} PLANO ${i.descri_ser}`,'ERRO')
                    print(`${resultunlook.message.exception}`,'ERRO')
                    break
                }

            }
  
            
            
    
        }
        

        return res.status(200).send({
            ok: true,
            client: true,
            type: result_cpf_cnpj.type,
            cpf_or_cnpj: result_cpf_cnpj.cpf_or_cnpj,
            unlookPlan: unlookPlan,
            qtdadePlan: result_dataClient.dataDB.length,
            codcli: result_dataClient.dataDB[0].codcli,
            nome_cli: result_dataClient.dataDB[0].nome_cli,
            planCadClient: result_dataClient.dataDB   //VOLTA SOMENTE UM CONTRATO, ERRO NO PROCESSO MICKS[0]
        });

    }
}
