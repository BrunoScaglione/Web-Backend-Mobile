const { Model, Datatypes } = require('sequelize');

class Address extends Model {
    static init(sequelize) {
        super.init({
            zipcode: Datatypes.STRING,
            street: Datatypes.STRING,
            number: Datatypes.INTEGER
        }, {
            sequelize
        })

    }

    static associate(models) {
        this.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' })
    }
}