const Sequelize = require('sequelize');
const dbConfig = require('../config/databaseERP');
const connectionERP = new Sequelize(dbConfig);



module.exports = async (cpf_cnpj) => {

    let select_intergrator = `
SELECT
    *
FROM clientes as c 
WHERE TRUE
AND (c.cpf = "${cpf_cnpj}" or c.cnpj ="${cpf_cnpj}");`


    try {
        const [results, metadata] = await connectionERP.query(select_intergrator);




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