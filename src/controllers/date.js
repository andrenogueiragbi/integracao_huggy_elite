const DayWelk = (number) => {
    switch (number) {
        case 1:
            return 'segunda'
        case 2:
            return 'terça'
        case 3:
            return 'quarta'
        case 4:
            return 'quinta'
        case 5:
            return 'sexta'
        case 6:
            return 'sabado'
        case 0:
            return 'domingo'
    }
}

module.exports = () => {
    var data = new Date()
    
    dia = data.getDate().toString()
    diaF = (dia.length == 1) ? '0' + dia : dia
    mes = (data.getMonth() + 1).toString() //+1 pois no getMonth Janeiro começa com zero.
    mesF = (mes.length == 1) ? '0' + mes : mes
    anoF = data.getFullYear();
    hora = String(data.getHours())
    horaF = (hora.length == 1) ? '0' + hora  : hora
    minutos = String(data.getMinutes())
    minutosF = (minutos.length == 1) ? '0' + minutos  : minutos
    segundos = String(data.getSeconds())
    segundosf = (segundos.length == 1) ? '0'+segundos : segundos
    weekF = DayWelk(data.getDay())

    return {
        dateHour: `${diaF}/${mesF}/${anoF}-${horaF}:${minutosF}:${segundosf}`,
        dateAll: `${diaF}/${mesF}/${anoF}`,
        hourAll: `${horaF}:${minutosF}:${segundosf}`,
        hour: `${horaF}`,
        minutes: minutosF,
        seconds: segundosf,
        day: diaF,
        month: mesF,
        year: anoF,
        week: weekF
    }

}

