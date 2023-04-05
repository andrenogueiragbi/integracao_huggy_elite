const { allFatCli, getLinkCenterASS, allFatCliOpen } = require('../controllers/IntegratorControllerAPI')
const moment = require('moment')



module.exports = async (codcli) => {
    let dataFat = await allFatCliOpen(codcli)

    if (dataFat.message.error) {
        return {
            ok: false,
            message: "cliente sem fatura ou boleto sem registro no banco."
        }
    }

    let faturas = dataFat.message.data.results


    if (faturas.length > 1) {
        faturas.sort(function (a, b) {
            if (a.vencimento < b.vencimento) {
                return -1;
            } else {
                return true;
            }
        });
    }

    let message = ""


    for (let index of faturas) {  //MENSAGE COM OS LINK DOS BOLETO
        var dataVencimento = new Date(index.vencimento);
        var dataHoje = new Date();


        var diff = moment(dataHoje).diff(moment(dataVencimento));
        let dayPassados = moment.duration(diff).asDays()


        console.log("GERANDO BOLETO", index.codfat, "CODCLI: ", codcli, "VALOR: ", index.valor_fatura, "DATA_VENC: ", moment(index.vencimento).format("DD-MM-YYYY"), dayPassados >= 1 ? "❗️" + parseInt(dayPassados) + " Dias Vencida" : '')
        link = await getLinkCenterASS(index.codfat)  //GERANDO BOLETO

        let boleto = `
📁Cadastro: ${index.nome_cliente.split(" ")[0]}
💵Valor: R$ ${index.valor_fatura} ${dayPassados >= 1 ? "\n❗️" + parseInt(dayPassados) + " Dia(s) Vencida" : ''}
📅 Venc.: ${moment(index.vencimento).format("DD-MM-YYYY")}
📎 link do boleto: ${link.message}`

        message = message + "\n" + boleto

    }


    return {
        ok: true,
        message
    }
}