const Sequelize = require('sequelize');
const dbConfig = require('../config/databaseERP');
const connectionERP = new Sequelize(dbConfig);



module.exports = async (codcli) => {

    var select_intergrator = `
SELECT 
    c.codcli,
    c.nome_cli ,
    o.numero_oco,
    o.data_lan,
    op.nome_ocop 
FROM ocorrencias o
JOIN oco_padrao op ON op.codocop  = o.codocop  
JOIN clientes c ON c.codcli = o.codcli 
WHERE o.codcli IN ('${codcli}') AND o.codsto = '01PENDENTE'; `


    try {
        const [results, metadata] = await connectionERP.query(select_intergrator);

        for(let i in results){ //REMOVENDO STRING VAZIAS DO INTEGRATOR
        results[i].nome_ocop = results[i].nome_ocop.trim(); 
        }


        return {
            ok: true,
            dataDB: results
        }


    } catch (error) {
        return {
            ok: false,
            message: `Error Servidor: ${error}`
        }

    }

}