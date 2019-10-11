/**
 * Database configs for use to create a connection between sequelize and database
 * Used: src/database/index.js
 */

module.exports = {
    dialect: 'postgres',
    host: 'localhost',
    username: 'postgres',
    password: 'docker',
    database: 'gobarber',
    define: {
        timestamps: true,
        underscored: true,
        underscoredAll: true,
    },
};
