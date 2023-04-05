
module.exports = (string) =>{

    string = string.replace(/[-/._ ,:; ]+/g, '')
    

    if (string.length == 11){
        string = string.substring(0,3)+"."+string.substring(3,6)+"."+string.substring(6,9)+"-"+string.substring(9);
        return{
            ok: true,
            type: "cpf",
            cpf_or_cnpj: string
        }

    }else if(string.length == 14){
        string = string.substring(0,2)+"."+string.substring(2,5)+"."+string.substring(5,8)+"/"+string.substring(8,12)+"-"+string.substring(12);

        return{
            ok: true,
            type: "cnpj",
            cpf_or_cnpj: string
        }
    }else{
        return{
            ok: false,
            message: "cpfcnpj badly formatted"

        }  
    }
}