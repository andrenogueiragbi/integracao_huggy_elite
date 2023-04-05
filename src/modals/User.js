const { Model, DataTypes } = require('sequelize');


class User extends Model {
    static init(sequelize){
        super.init({
            user: DataTypes.STRING,
            token: DataTypes.STRING,
        }, {sequelize})
    }
}
module.exports = User