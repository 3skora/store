"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var config_1 = __importDefault(require("../config"));
var handleUnauthorizedError = function (next) {
    var error = new Error('Login Error, Please login again');
    error.status = 401;
    next(error);
};
var auth = function (req, _res, next) {
    try {
        var authHeader = req.headers.authorization;
        if (!authHeader)
            return handleUnauthorizedError(next);
        var token = authHeader.split(' ')[1];
        if (!token)
            return handleUnauthorizedError(next);
        var decode = jsonwebtoken_1.default.verify(token, config_1.default.tokenSecret);
        // Failed to authenticate user.
        if (!decode)
            return handleUnauthorizedError(next);
        next();
    }
    catch (err) {
        handleUnauthorizedError(next);
    }
};
exports.default = auth;
