const dataPix = require('../modals/Boleto')
const validator = require('./Formatcpf_cnpj');
const NumberAcounts = require('../modals/NumberAcounts')
const print = require('../controllers/print');
const boletos = require('../controllers/processBoleto');




module.exports = {
    async boletoCheck(req, res) {
        const { cpfcnpj } = req.body;

        if (!cpfcnpj || cpfcnpj.length < 11) {    // VERIFICA SE TEM PARAMETRO CORRETOS NO USUÁRIO
            print(`>>> CLIENTE DIGITOU MENOS CARACTERES: ${cpfcnpj}`, 'ERRO')
            return res.status(200).send({
                ok: false,
                cpf_or_cnpj: cpfcnpj,
                message: "Cliente digitou o CPF ou CNPJ inválido"  //RETORNO PARA HUGGY ATENDENTE
            });
        }

        result_cpf_cnpj = validator(cpfcnpj);     //VALIDANDO FORMATO DE CPF OU CNPJ ENVIADO

        if (!result_cpf_cnpj.ok) {               // VERIFICA QUANDO O CPF  OU CNPJ  NÃO ESTA NO FORMATO CORRETO
            print(`>>> CLIENTE DIGITOU INVÁLIDO: ${cpfcnpj}`, 'ERRO')
            return res.status(200).send({
                ok: false,
                cpf_or_cnpj: cpfcnpj,
                message: "Cliente digitou o CPF ou CNPJ inválido"  //RETORNO PARA HUGGY ATENDENTE
            });
        }

        result_dataClient = await NumberAcounts(result_cpf_cnpj.cpf_or_cnpj)   //CONULTANDO NO BANDO DE DADOS DO INTEGRATOR


        if (!result_dataClient.ok) {  //VERIFICA QUANDO O BANCO DE DADOS DE ERRO
            print(`>>> FALHA NO SERVIDOR: ${cpfcnpj}`, 'ERRO')
            return res.status(500).send({
                ok: false,
                message: "Falha na API, reportar ao Desemvolvimento urgente"  //RETORNO PARA HUGGY ATENDENTE
            });
        }



        if (result_dataClient.dataDB.length == 0) {  //VERIFICA SE E CLIENTE DENTRO DA BASE
            print(`>>> CLIENTE NÃO IDENTIFICADO: ${cpfcnpj}`, 'ERRO')
            return res.status(200).send({
                ok: false,
                client: false,
                type: result_cpf_cnpj.type,
                cpf_or_cnpj: result_cpf_cnpj.cpf_or_cnpj,
                message: "Cliente digitou o CPF ou CNPJ inválido"  //RETORNO PARA HUGGY ATENDENTE

            });
        }



        if (result_dataClient.dataDB.length > 1) {  //VERIFICA SE E CLIENTE DENTRO DA BASE
            print(`>>> CLIENTE IDENTIFICADO COM ${result_dataClient.dataDB.length} PLANOS : ${cpfcnpj}`, 'ERRO')
            return res.status(200).send({
                ok: false,
                client: true,
                type: result_cpf_cnpj.type,
                cpf_or_cnpj: result_cpf_cnpj.cpf_or_cnpj,
                message: "Cliente com o CPF/CNPJ em mais de um cadastro"  //RETORNO PARA HUGGY ATENDENTE
            });
        }




        const fat = await boletos(result_dataClient.dataDB[0].codcli)

        if (!fat.ok) {
            print(`>>> CLIENTE IDENTIFICADO COM PROBLEMA EM FATURA: ${result_dataClient.dataDB[0].nome_cli} ${cpfcnpj} \n${fat.message}`,'ERRO')


            return res.status(200).send({
                ok: false,
                client: true,
                type: result_cpf_cnpj.type,
                cpf_or_cnpj: result_cpf_cnpj.cpf_or_cnpj,
                message: fat.message

            });
        }




        return res.status(200).send({
            ok: true,
            client: true,
            type: result_cpf_cnpj.type,
            cpf_or_cnpj: result_cpf_cnpj.cpf_or_cnpj,
            message: fat.message


        });

    }
}
