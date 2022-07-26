"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var controllers = __importStar(require("../../controllers/users.controller"));
var auth_middleware_1 = __importDefault(require("../../middleware/auth.middleware"));
var usersRoutes = (0, express_1.Router)();
// /api/users/..
usersRoutes.post('/login', controllers.login);
usersRoutes.post('/', controllers.createUser);
usersRoutes.get('/', auth_middleware_1.default, controllers.getAllUsers);
usersRoutes.get('/:id', auth_middleware_1.default, controllers.getUser);
usersRoutes.patch('/:id', auth_middleware_1.default, controllers.updateUser);
usersRoutes.patch('/:id/password', auth_middleware_1.default, controllers.updateUserPassword);
usersRoutes.delete('/:id', auth_middleware_1.default, controllers.deleteUser);
exports.default = usersRoutes;
