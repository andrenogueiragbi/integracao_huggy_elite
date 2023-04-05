
module.exports = (print, type) => {

    if (type == "info" || type == "INFO") {
        console.log('\x1b[34m%s\x1b[0m', `${print}`);
    } else if (type == "erro" || type == "ERRO") {
        console.log('\x1b[31m%s\x1b[0m', `${print}`);
    } else if (type == "alert" || type == "ALERT") {
        console.log('\x1b[33m%s\x1b[0m', `${print}`);
    } else {
        console.log('\x1b[32m%s\x1b[0m', `${print}`);
    }
}
