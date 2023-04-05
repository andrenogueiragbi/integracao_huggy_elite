const { Model, DataTypes } = require('sequelize');


class Ip extends Model {
    static init(sequelize){
        super.init({
            name: DataTypes.STRING,
            ip: DataTypes.STRING,
        }, {sequelize})
    }
}
module.exports = Ip