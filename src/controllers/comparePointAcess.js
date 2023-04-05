const print = require('../controllers/print');


module.exports = (pointAcessClis, pointAccessMckFails) => {

    pointAccessMckFails.push('A4_G18_C1')

    if (pointAccessMckFails.indexOf("*") > -1) {  //QUANDO HÀ FALHA MASSIVA GERAL
        return true;
    }

    for (pontoAcessCLI of pointAcessClis) { //QUANDO HÁ FALHA NA CAIXA

        console.log('>>>>>',pontoAcessCLI)
        if (pointAccessMckFails.indexOf(pontoAcessCLI) > -1) {  
            return true;
        }

    }


}