const { allFatCli, getLinkCenterASS, allFatCliOpen, getLinkPix } = require('../controllers/IntegratorControllerAPI')
const moment = require('moment')



module.exports = async (codcli) => {
    let dataFat = await allFatCliOpen(codcli)
    var code = ''



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


            if(faturas[index].vencimento == faturas[n].vencimento){
                console.log('PIX igual: ',codcli)
                faturasCheck.push(faturas[index]); 

            }else{
                faturasCheck.push(faturas[index]); 
                break
            }
        }    
    }else{
        faturasCheck.push(faturas[0])
    }


    let message = ""


    for (let index of faturasCheck) {  //MENSAGE COM OS LINK DOS BOLETO
        var dataVencimento = new Date(index.vencimento);
        var dataHoje = new Date();


        var diff = moment(dataHoje).diff(moment(dataVencimento));
        let dayPassados = moment.duration(diff).asDays()

        if(dayPassados > 45){
            return {
                ok: false,
                message: `cliente com fatura mais de ${parseInt(dayPassados)} dia(s) vencido(s)`
            }
    
        }
    


        console.log("GERANDO PIX", index.codfat, "CODCLI: ", codcli, "VALOR: ", index.valor_fatura, "DATA_VENC: ", moment(index.vencimento).format("DD-MM-YYYY"), dayPassados >= 1 ? "❗" + parseInt(dayPassados) + " Dias Vencida" : '')
        
        const Pix = await allFatCli(codcli)
        let usePix = false

        for (let pixN of Pix.message.data.results){
            if(pixN.codfat == index.codfat && pixN.usa_pix == "S"){
                usePix = true;
                break;

            }
        }

        console.log(index.codfat,usePix)

        if(!usePix){
            return {
                ok: false,
                message: `A fatura ${index.codfat} não pode ser gerado o Pix`
            }

        }


        const link = await getLinkPix(index.codfat)  //GERANDO PIX


        if(!link.ok){
            return {
                ok: false,
                message: `Erro na API informar o setor de Desemvolvimento`
            }

        }

        if(!link.message.data){
            return {
                ok: false,
                message: `Falha na API do integrator`

            }

        }

        let codPix = link.message.data.results[0].textoImagemQRcode


        let boleto = `📁Cadastro: ${index.nome_cliente.split(" ")[0]}
💵Valor: R$ ${index.valor_fatura} ${dayPassados >= 1 ? "\n❗️" + parseInt(dayPassados) + " Dia(s) Vencida" : ''}
📅 Venc.: ${moment(index.vencimento).format("DD-MM-YYYY")}
Seu código pix👇`

        message = message + "\n" + boleto
        code = codPix
    }


    return {
        ok: true,
        message,
        code
    }
}