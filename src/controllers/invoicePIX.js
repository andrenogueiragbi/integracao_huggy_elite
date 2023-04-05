const client = require('../controllers/massiveCheck');
const { getLinkPix, allFatCliToDate } = require('../controllers/IntegratorControllerAPI')
const print = require('./print')


module.exports = {
    async allFat(req, res) {

        const { codcli, from, to } = req.body;

        try {

            if (!codcli) {
                print(`>>> FALTA CODCLI`, 'ERRO')
                return res.status(200).send({
                    ok: false,
                    message: "invalid parameter or indefinite customer"

                });

            }

            const result = await allFatCliToDate(codcli, from, to)



            if (!result.message.error && result.message.data.results.length > 0) {

                var fatura = result.message.data.results

                fatura.map((item, index) => {
                    item.histo_fat = undefined;
                    item.descri_cob = undefined;
                    item.chaveitau = undefined;
                    item.empresaitau = undefined;
                    item.permite_pg_cartao = undefined;
                    item.negociacao = undefined;
                    item.limite_segunda_via_dias_extras = undefined;
                    item.mostra_boleto_protocol_cancel = undefined;
                    item.referencia_plano = undefined;
                    item.nro_ban = undefined;
                    item.n_boleto = undefined;
                    item.muestra_boleto = undefined;
                    item.codemp = undefined;

                    if (item.Saldo == '0.00') {
                        item['pago'] = true
                    } else {
                        item['pago'] = false
                    }


                    if (parseInt(item.dias) > 0 && item.Saldo != '0.00') {
                        item['vencida'] = true
                        item['dias vencida'] = parseInt(item.dias)
                    } else {
                        item['vencida'] = false
                        item['dias vencida'] = 0
                    }

                })

                print(`>>> LSITANDO FATURAS CLIENTE ${codcli}`, 'ALERT')


                return res.status(200).send({
                    ok: true,
                    fatura
                });

            }

            if (result.message.error) {
                print(`>>>CLIENTE ${codcli} SEM FATURAS`, 'ALERT')

                return res.status(200).send({
                    ok: false,
                    message: result.message.exception,
                    fatura: []
                });

            }



        } catch (e) {
            print(`>>>FALAHA SERVIDOR ${e}`, 'ALERT')
            return res.status(400).send({
                ok: false,
                incident: false,
                message: `Erro server error: ${e}`

            });

        }

    },
    async fatPIX(req, res) {

        const { codfat} = req.body;

        try {

            if (!codfat) {
                print(`>>> FALTA CODFAT`, 'ERRO')
                return res.status(200).send({
                    ok: false,
                    message: "invalid parameter or indefinite customer"

                });

            }

            const result = await getLinkPix (codfat)



            if (!result.message.error && result.message.data.results.length > 0) {

                var pix = result.message.data.results
                print(`>>> GERANDO PIX CODFAT ${codfat}`, 'ALERT')

                return res.status(200).send({
                    ok: true,
                    pix
                });

            }

            if (result.message.error) {
                print(`>>>FATURA ${codfat} INVALIDA`, 'ALERT')

                return res.status(200).send({
                    ok: false,
                    message: result.message.exception,
                    pix: []
                });

            }



        } catch (e) {
            print(`>>>FALAHA SERVIDOR ${e}`, 'ALERT')
            return res.status(400).send({
                ok: false,
                incident: false,
                message: `Erro server error: ${e}`

            });

        }

    }
}