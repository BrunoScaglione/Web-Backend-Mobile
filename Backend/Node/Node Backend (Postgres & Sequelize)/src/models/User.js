const { Model, Datatypes } = require('sequelize');

class User extends Model {
    static init(sequelize) {
        super.init({
            name: Datatypes.STRING,
            email: Datatypes.STRING
        }, {
            sequelize
        })
    }

    static associate(models) {
        this.hasMany(models.Adress, { foreignKey: 'user_id', as: 'adresses' });
        this.belongsToMany(models.Adress, { foreignKey: 'user_id', as: 'adresses' });
    }
}
//N pra N sempre eh belongsToMany

module.exports = User;