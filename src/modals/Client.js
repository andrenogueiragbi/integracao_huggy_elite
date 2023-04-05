const Sequelize = require('sequelize');
const dbConfig = require('../config/databaseERP');
const connectionERP = new Sequelize(dbConfig);



module.exports = async (cpf_cnpj) => {

    let select_intergrator = `
SELECT
    c.codcli, 
    c.nome_cli,
    c.endereco,
    c.bairro,
    c.e_mail,
    c.celular, 
    sc.codsercli ,
    s.descri_ser,
    sc.codest,
    cond.nome_con
FROM clientes as c 
    JOIN servicos_cli sc ON c.codcli = sc.codcli 
    JOIN servicos s ON sc.codser = s.codser 
    LEFT JOIN condominios cond ON cond.codcon = sc.codcon
WHERE TRUE
AND (c.cpf = "${cpf_cnpj}" or c.cnpj ="${cpf_cnpj}")
AND sc.codest != '020IN0W6LU'
AND s.autentica_radius = 'S'
ORDER BY s.descri_ser DESC ;`


    try {
        const [results, metadata] = await connectionERP.query(select_intergrator);

        for(let i in results){ //REMOVENDO STRING VAZIAS DO INTEGRATOR
        results[i].nome_cli = results[i].nome_cli.trim();
        results[i].e_mail = results[i].e_mail.trim();
        results[i].descri_ser = results[i].descri_ser.trim(); 
        results[i].celular = results[i].celular.trim(); 
        results[i].endereco = results[i].endereco.trim(); 
        results[i].bairro = results[i].bairro.trim(); 
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