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



    let faturasCheck = [];

    if (faturas.length > 1) {
        faturas.sort(function (a, b) {
            if (a.vencimento < b.vencimento) {
                return -1;
            } else {
                return true;
            }
        });




        for (let index in faturas) {
            let n = parseInt(index) + 1;

            console.log(">>>", index, n)




            if (n < faturas.length && faturas[index].vencimento == faturas[n].vencimento) {
                console.log('Boletos igual: ', codcli)
                faturasCheck.push(faturas[index]);

            } else {
                faturasCheck.push(faturas[index]);
                break
            }
        }

    } else {

        faturasCheck.push(faturas[0])  //QUANDO CLIENTE TEM SOMENTE UM BOLETO

    }






    let message = ""


    for (let index of faturasCheck) {  //MENSAGE COM OS LINK DOS BOLETO
        var dataVencimento = new Date(index.vencimento);
        var dataHoje = new Date();


        var diff = moment(dataHoje).diff(moment(dataVencimento));
        let dayPassados = moment.duration(diff).asDays()

        if (dayPassados > 45) {
            return {
                ok: false,
                message: `cliente com fatura mais de ${parseInt(dayPassados)} dia(s) vencido(s)`
            }

        }





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