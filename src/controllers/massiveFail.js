const client = require('../controllers/massiveCheck');


module.exports = {
    async failCheck(req, res) {

        const { codcli } = req.body;        

        try{
            if (codcli && !codcli.includes('{') && !codcli.includes('}') && parseInt(codcli) | 0) {
            
                if (await client.clientFail(codcli) === true) {
                    return res.status(200).send({
                        ok: true,
                        incident: true
                    });
    
    
                } else {
                    return res.status(200).send({
                        ok: true,
                        incident: false
    
                    });
    
                }
    
            }
    
           
            return res.status(200).send({
                ok: false,
                incident: false,
                message: "invalid parameter or indefinite customer"
    
            });
    

        }catch(e){
            return res.status(400).send({
                ok: false,
                incident: false,
                message: `Erro server error: ${e}`
    
            });

        }
        
    }
}