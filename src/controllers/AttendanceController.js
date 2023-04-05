const dataAttendance = require('../modals/Attendance')

module.exports = {
    async attendanceCheck(req, res) {

        const { codcli } = req.body;


        if (!codcli || !Number(codcli)) {    // VERIFICA SE TEM PARAMETRO CORRETOS NO USUÁRIO
            return res.status(400).send({
                ok: false,
                message: 'codcli not define or not is numeric'
            });
        }


        result_dataAttendance = await dataAttendance(codcli)

        if(!result_dataAttendance.ok){  //VERIFICA QUANDO O BANCO DE DADOS DE ERRO
            return res.status(500).send({
                ok: false,
                message: result_dataAttendance.message
            });       
        }


        if(result_dataAttendance.dataDB.length == 0){
            return res.status(200).send({
                ok: true,
                attendancePending: false,
                message: 'Client not have attendance'
            });

        }

        let messageData = ''
        for(const i of result_dataAttendance.dataDB){
            var n = new Date(i.data_lan);

            messageData = messageData + `Protocolo: ${i.numero_oco} - ${i.nome_ocop}, Aberto em: ${i.data_lan.toISOString().replace(/T/, ' ').replace(/\..+/, '')}\n`
            
        }
        

        message = `

O cliente ${result_dataAttendance.dataDB[0].nome_cli} tem ${result_dataAttendance.dataDB.length} atendimento(s) aberto(s).

${messageData}`




        return res.status(200).send({
            ok: false,
            attendancePending: true,
            message:message
        });


    }
}