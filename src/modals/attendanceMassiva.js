const Sequelize = require('sequelize');
const dbConfig = require('../config/databaseERP');
const connectionERP = new Sequelize(dbConfig);



module.exports = async () => {

    var select_intergrator = `
SELECT 
    o.codoco,
    o.codcli,
    o.codsto,
    o.descri_oco,
    c.descri_com 
    from ocorrencias o 
JOIN comentarios c ON o.codoco = c.codoco 
WHERE codcli = 6850
AND o.codocop = "E94J0IR6YE"
AND codsto = "01PENDENTE";`


    try {
        const [results, metadata] = await connectionERP.query(select_intergrator);

   /*      for(let i in results){ //REMOVENDO STRING VAZIAS DO INTEGRATOR
            console.log(i)
        //results[i].nome_ocop = results[i].nome_ocop.trim(); 
        } */


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