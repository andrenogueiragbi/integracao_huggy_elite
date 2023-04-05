const User = require('../modals/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth.json')

function generateToken(user) {
    return jwt.sign(user, authConfig.secret);
}





module.exports = {
    async newUser(req, res) {
        const { user } = req.body;


        if (!user || user.length < 4) {   // VERIFICA SE TEM PARAMETRO CORRETOS NO USUÁRIO
            return res.status(400).send({
                ok: false,
                message: 'User not define or too small to create'
            });
        }
        

        try {
            if (await User.findOne({ where: { user } })) {
                return res.status(400).send({
                    ok: false,
                    message: 'already exists'
                });
            }

            token = `${user}-${generateToken(user)}`

            const userNew = await User.create({ user,token });

    
            return res.status(200).send({
                ok: true,
                message: 'User created success!',
                userNew
                
            })

        } catch (error) {
            return res.status(500).send({
                ok: false,
                message: 'The server failed',
                error
            });
        }
    }













}