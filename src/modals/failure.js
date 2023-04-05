const Sequelize = require('sequelize');
const dbConfig = require('../config/databaseERP');
const dbConfigMassiva = require('../config/databaseMASSIVA');



const connectionERP = new Sequelize(dbConfig);
const connectionMCK = new Sequelize(dbConfigMassiva);



module.exports = {

    async selectPontAcess(codcli) {
  
        let select_intergrator = `
        SELECT cl.codcli,cond.nome_con ,cl.nome_cli from clientes cl 
        JOIN servicos_cli sc
        JOIN condominios cond 
        WHERE cl.codcli = sc.codcli
        AND sc.codest = "020IF0JLW9"
        AND cl.codcli = '${codcli}'
        AND cond.codcon = sc.codcon;`
    

        const [results, metadata] = await connectionERP.query(select_intergrator);

        return results

    },

    async selectPontFail() {
  
        var select = `SELECT * FROM falha_massiva ORDER BY nivel_falha DESC;`
    

        const [results, metadata] = await connectionMCK.query(select);

        return results

    },
}
