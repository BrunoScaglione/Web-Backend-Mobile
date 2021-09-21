const { Model, Datatypes } = require('sequelize');

class Tech extends Model {
    static init(sequelize) {
        super.init({
            name: Datatypes.STRING,
        }, {
            sequelize,
            tableName: 'techs'
        })

    }

    static associate(models) {
        this.belongstoMany(models.User, { foreignKey: 'tech_id', through: 'user_techs', as: 'users' });
    }
}

module.exports = Tech;