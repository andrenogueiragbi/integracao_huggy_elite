const { whois } = require('../controllers/whois')
const logs = require('../middlewares/logAcess')


module.exports = {
  async pageStart(req, res) {


    resultWhois = await whois(req.connection.remoteAddress.split('::ffff:')[1])

    const browser = req.connection.parser.incoming.socket.parser.incoming.rawHeaders || "undefined"
    let browserUser = ""
    if (browser.length == 8) {
      browserUser = browser[3]
    }


    for (let i of browser) {

      if(i.toLowerCase().match("mozilla")){
        browserUser = "mozilla"
        break
      }
      if(i.toLowerCase().match("linux")){
        browserUser = "linux"
        break
      }
      if(i.toLowerCase().match("chrome")){
        browserUser = "chrome"
        break
      }
      if(i.toLowerCase().match("opera")){
        browserUser = "opera"
        break
      }
      if(i.toLowerCase().match("explorer")){
        browserUser = "explorer"
        break
      }

      if(i.toLowerCase().match("safari")){
        browserUser = "safari"
        break
      }

    }

    const log = logs(req, res)


    html = `
<!DOCTYPE html>
<html lang="pt-br">
  <head>
    <title>API MICKS</title>
    <meta charset="utf-8">
    <style>
        body {
            text-align: center;
        }

        h2 {
            color:red;
            background-color: black;
            font-weight: bold;
        }

</style>
  </head>
  <body>
    <h2> WELCOME API SUPORTE V 2.0  (C) MICKS 2022-2022 </h2>
    <h1>YOUR ADRESS: ${log.ip}</h1>
    <h1>YOUR PROVIDER: ${resultWhois.ok ? resultWhois.message.org : "127.0.0.1"} </h1>
    <h1>SOURCE PORT: ${log.source_port}<h1>
    <h1>DESTINATION PORT: ${log.destinatioPort}<h1>
    <h1>ROUTE ACESS: ${log.route}<h1>
    <h1>YOUR BROWSER: ${browserUser ? browserUser : req.connection.parser.incoming.socket.parser.incoming.rawHeaders[9]}<h1>
    <h1>HOUR ACESS: ${log.hour}<h1>
    
  </body>
</html>
`



    res.send(html)


  }


}

