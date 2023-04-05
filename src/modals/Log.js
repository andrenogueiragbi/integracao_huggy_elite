const { Model, DataTypes } = require('sequelize');

class Log extends Model {
    static init(sequelize){
        super.init({
            token: DataTypes.STRING,
            ip: DataTypes.STRING,
            source_port: DataTypes.STRING,
            route: DataTypes.STRING,
            status:DataTypes.STRING,
        }, {sequelize})
    }
}    
module.exports = Log    