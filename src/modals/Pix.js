const Sequelize = require('sequelize');
const dbConfig = require('../config/databaseERP');
const connectionERP = new Sequelize(dbConfig);



module.exports = async (codcli) => {

    var select_intergrator = `
SELECT 
    * 
FROM clientes c
WHERE c.codcli IN ('${codcli}');`


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