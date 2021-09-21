'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('adresses', {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false,
            },
            user_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: { model: 'users', key: 'id' }, // users é a tabela de User
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE', // 'RESTRICT', 'SET NULL' tb pode ser
            },
            zipcode: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            street: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            number: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            // eh soh automatizado pra ele preencher esses campos
            created_at: {
                type: Sequelize.DATE,
                allowNull: false
            },
            updated_at: {
                type: Sequelize.DATE,
                allowNull: false
            },

        });
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('adresses');
    }
};