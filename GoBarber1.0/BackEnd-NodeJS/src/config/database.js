require('dotenv/config');

/**
 * Database configs for use to create a connection between sequelize and database
 * Used: src/database/index.js
 */

module.exports = {
    dialect: 'postgres',
    host: process.env.DB_HOST,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    define: {
        timestamps: true,
        underscored: true,
        underscoredAll: true,
    },
};
