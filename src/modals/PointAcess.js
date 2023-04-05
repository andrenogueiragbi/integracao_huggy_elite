const Sequelize = require('sequelize');
const dbConfig = require('../config/databaseERP');
const connectionERP = new Sequelize(dbConfig);



module.exports = async (codcli) => {

    let select_intergrator = `
SELECT
    cond.nome_con
FROM clientes as c 
    JOIN servicos_cli sc ON c.codcli = sc.codcli 
    JOIN servicos s ON sc.codser = s.codser 
    JOIN condominios cond ON cond.codcon = sc.codcon
WHERE TRUE
AND c.codcli = ${codcli}
AND sc.codest != '020IN0W6LU'
AND s.autentica_radius = 'S';`


    try {
        const [results, metadata] = await connectionERP.query(select_intergrator);

        pointAccess = []
        for(let i in results){ //CRIANDO ARRAY DE PONTO DE ACESSO
            pointAccess.push(results[i]);
        }


        return {
            ok: true,
            dataDB: pointAccess
        }

    } catch (error) {
        return {
            ok: false,
            message: `Error Servidor: ${error}`
        }
    }

}