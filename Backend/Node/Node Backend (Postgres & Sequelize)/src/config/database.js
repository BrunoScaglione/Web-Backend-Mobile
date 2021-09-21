module.exports = {
    dialect: 'postgres',
    host: 'localhost',
    username: 'postgres',
    password: 'postgres',
    database: 'testnode',
    define: {
        timestamps: true,
        underscored: true, // quero nome das minhas tabelas no formato com nomes com underscore
    },

};