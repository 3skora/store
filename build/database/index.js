"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var pg_1 = require("pg");
var config_1 = __importDefault(require("../config"));
var pool = new pg_1.Pool({
    host: config_1.default.host,
    database: config_1.default.database,
    user: config_1.default.user,
    port: parseInt(config_1.default.dbPort)
});
pool.on('error', function (error) {
    console.error(error.message);
});
exports.default = pool;
