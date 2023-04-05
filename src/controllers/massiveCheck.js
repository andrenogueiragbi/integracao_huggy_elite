const { selectPontAcess, selectPontFail } = require('../modals/failure');

//debug
let problem = ["A2_G3_C1", "BJL_A2", "BJL_A2_G1_C5", "BJL_A2_G1", "BJL_A1_G10"];


module.exports = {
    async clientFail(codcli) {
        let pontoAcessoCLi = [];
        let pontoWithFail = [];
        let grupocli;
        let areacli;

        try {
            dataDB_ERP = await selectPontAcess(codcli);
            dataDB_MCK = await selectPontFail();

            //preenchendo os arrays 
            for (let i of dataDB_ERP) {
                pontoAcessoCLi.push(i.nome_con);
            }

            
            for(let i of  dataDB_MCK){
                pontoWithFail.push(i.nivel_falha);
            }


            //interando o ponto de acesso do cliente.
            for (let p of pontoAcessoCLi) {
                //console.log(p)

                //interando falha cadastrada no ponto de acesso.
                for (let f of pontoWithFail) {


                    if (p == f) {
                        console.log(`CAIXA=>${p}==${f}`, "alert");
                        return true;
                    }

                    ponto = p.split('_');

                    if (ponto.length == 3) {
                        areacli = `${ponto[0]}`;
                        grupocli = `${ponto[0]}_${ponto[1]}`;

                        if (areacli == f) {
                            console.log(`AREA=>${areacli}==${f}`, "alert");
                            return true;

                        }

                        if (grupocli == f) {
                            console.log(`GRUPO=>${grupocli}==${f}`, "alert");
                            return true;
                        }


                    } else {
                        areacli = `${ponto[0]}_${ponto[1]}`;
                        grupocli = `${ponto[0]}_${ponto[1]}_${ponto[2]}`;

                        if (areacli == f) {
                            console.log(`AREA=>${areacli}==${f}`, "alert");
                            return true;

                        } if (grupocli == f) {
                            console.log(`GRUPO=>${grupocli}==${f}`, "alert");
                            return true;
                        }

                    }

                }

            }
            return false;

        } catch (error) {

            console.log(error, "erro");
            return false;
        }
    }
}