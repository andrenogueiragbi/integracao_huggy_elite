require('dotenv').config()

//FROM MYSQL
module.exports = {
    dialect: 'mysql',
    database: "api",
    username: process.env.DB_USERMCKMASSIVA,
    password: process.env.DB_PASSMCKMASSIVA,
    host: process.env.DB_HOSTMCKMASSIVA,
    logging: false,
    define: {
        timestamps: true,
        underscored: true,
    },
}

