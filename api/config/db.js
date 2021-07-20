const mysql = require("mysql");

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "wymldh20121216",
    database: "campaignwithus",
    charset: "utf8mb4_unicode_ci",
});

module.exports = db;