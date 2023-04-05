const date = require('../controllers/date');
const Log = require('../modals/Log');


module.exports = (req, res) => {


    let dataAcess = {
        ip: req.connection.remoteAddress.split('::ffff:')[1] || '127.0.0.1',
        source_port: req.connection._peername.port || 0,
        destinatioPort: req.rawHeaders[1].split(":")[1] || 0,
        route: req.connection.parser.incoming.url || 0,
        hour: date().dateHour || 0

    }

    return dataAcess


}







