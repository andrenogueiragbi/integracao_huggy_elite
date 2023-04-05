require('dotenv').config()

//FROM MYSQL
module.exports = {
    dialect: 'mysql',
    database: process.env.DATABASEMCK,
    username: process.env.DB_USERMCK,
    password: process.env.DB_PASSMCK,
    host: process.env.DB_HOSTMCK,
    logging: false,
    define: {
        timestamps: true,
        underscored: true,
    },
}


