const axios = require('axios');

module.exports = {
    async whois(ip) {

        const token = 'tokenaqui'

        const config = {
            method: 'get',
            url: `http://ipinfo.io/${ip}?token=${token}`,
            timeout: 10000

        }

        try {
            let res = await axios(config);
            if (res.data.bogon) {
                return {
                    ok: false,
                    message: "localhost"
                }
            } else {
                return {
                    ok: true,
                    message: res.data
                }
            }
        } catch (erro) {
            return {
                ok: false,
                message: 'error in API whois'
            }
        }
    }
}
