"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var bcrypt_1 = __importDefault(require("bcrypt"));
var database_1 = __importDefault(require("../database"));
var config_1 = __importDefault(require("../config"));
var hashPassword = function (password) {
    var saltRounds = parseInt(config_1.default.salt);
    return bcrypt_1.default.hashSync("".concat(password).concat(config_1.default.pepper), saltRounds);
};
//CRUD operations
var UserModel = /** @class */ (function () {
    function UserModel() {
        this.table = 'users';
        this.info = 'id,email,user_name,first_name,last_name';
    }
    //create
    UserModel.prototype.create = function (u) {
        return __awaiter(this, void 0, void 0, function () {
            var conn, sql, result, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, database_1.default.connect()
                            //run query
                        ];
                    case 1:
                        conn = _a.sent();
                        sql = "INSERT INTO ".concat(this.table, " (email,user_name,first_name,last_name,password)\n       VALUES ($1,$2,$3,$4,$5) RETURNING ").concat(this.info);
                        return [4 /*yield*/, conn.query(sql, [
                                u.email,
                                u.user_name,
                                u.first_name,
                                u.last_name,
                                hashPassword(u.password)
                            ])
                            // release connection
                        ];
                    case 2:
                        result = _a.sent();
                        // release connection
                        conn.release();
                        //return result
                        return [2 /*return*/, result.rows[0]];
                    case 3:
                        error_1 = _a.sent();
                        throw new Error("Unable to create ".concat(u.user_name, " : ").concat(error_1.message));
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    //get all users
    UserModel.prototype.getAll = function () {
        return __awaiter(this, void 0, void 0, function () {
            var conn, sql, result, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, database_1.default.connect()];
                    case 1:
                        conn = _a.sent();
                        sql = "SELECT ".concat(this.info, " FROM ").concat(this.table);
                        return [4 /*yield*/, conn.query(sql)];
                    case 2:
                        result = _a.sent();
                        conn.release();
                        return [2 /*return*/, result.rows];
                    case 3:
                        error_2 = _a.sent();
                        throw new Error("Unable to retrieving : ".concat(error_2.message));
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    //get specific user
    UserModel.prototype.getUser = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var conn, sql, result, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, database_1.default.connect()];
                    case 1:
                        conn = _a.sent();
                        sql = "SELECT ".concat(this.info, " FROM ").concat(this.table, " WHERE id=$1");
                        return [4 /*yield*/, conn.query(sql, [id])];
                    case 2:
                        result = _a.sent();
                        conn.release();
                        return [2 /*return*/, result.rows.length ? result.rows[0] : null];
                    case 3:
                        error_3 = _a.sent();
                        throw new Error("Unable to retrieve user ".concat(id, " : ").concat(error_3.message));
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    //update user's password
    UserModel.prototype.updateUserPassword = function (id, password) {
        return __awaiter(this, void 0, void 0, function () {
            var conn, sql, result, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, database_1.default.connect()];
                    case 1:
                        conn = _a.sent();
                        sql = "UPDATE ".concat(this.table, " SET password=$2 WHERE id=$1 RETURNING ").concat(this.info, ",password");
                        return [4 /*yield*/, conn.query(sql, [id, hashPassword(password)])];
                    case 2:
                        result = _a.sent();
                        conn.release();
                        return [2 /*return*/, result.rows[0]];
                    case 3:
                        error_4 = _a.sent();
                        throw new Error("Can not update password of user ".concat(id, " : ").concat(error_4.message));
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    //update user
    UserModel.prototype.updateUser = function (id, u) {
        return __awaiter(this, void 0, void 0, function () {
            var conn, sql, result, error_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, database_1.default.connect()];
                    case 1:
                        conn = _a.sent();
                        sql = "UPDATE ".concat(this.table, " SET email=$1, user_name=$2, first_name=$3, last_name=$4\n      WHERE id=$5\n      RETURNING ").concat(this.info);
                        return [4 /*yield*/, conn.query(sql, [u.email, u.user_name, u.first_name, u.last_name, id])];
                    case 2:
                        result = _a.sent();
                        conn.release();
                        return [2 /*return*/, result.rows[0]];
                    case 3:
                        error_5 = _a.sent();
                        throw new Error("Can Not UPDATE first name of user ".concat(u.id, " : ").concat(error_5.message));
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    //delete user
    UserModel.prototype.deleteUser = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var conn, sql, result, error_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, database_1.default.connect()];
                    case 1:
                        conn = _a.sent();
                        sql = "DELETE FROM ".concat(this.table, " WHERE id=$1 RETURNING ").concat(this.info);
                        return [4 /*yield*/, conn.query(sql, [id])];
                    case 2:
                        result = _a.sent();
                        conn.release();
                        return [2 /*return*/, result.rows[0]];
                    case 3:
                        error_6 = _a.sent();
                        throw new Error("Can Not DELETE user ".concat(id, " : ").concat(error_6.message));
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    //authenticate
    UserModel.prototype.login = function (email, password) {
        return __awaiter(this, void 0, void 0, function () {
            var conn, sql, hashedPassword, isValidPassword, userInfoQuery, userInfo, error_7;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        return [4 /*yield*/, database_1.default.connect()];
                    case 1:
                        conn = _a.sent();
                        sql = "SELECT password FROM ".concat(this.table, " WHERE email=$1");
                        return [4 /*yield*/, conn.query(sql, [email])];
                    case 2:
                        hashedPassword = _a.sent();
                        if (!hashedPassword.rows.length) return [3 /*break*/, 4];
                        isValidPassword = bcrypt_1.default.compareSync("".concat(password).concat(config_1.default.pepper), hashedPassword.rows[0].password);
                        if (!isValidPassword) return [3 /*break*/, 4];
                        userInfoQuery = "SELECT ".concat(this.info, " FROM ").concat(this.table, " where email=$1");
                        return [4 /*yield*/, conn.query(userInfoQuery, [email])];
                    case 3:
                        userInfo = _a.sent();
                        return [2 /*return*/, userInfo.rows[0]];
                    case 4:
                        conn.release();
                        return [2 /*return*/, null];
                    case 5:
                        error_7 = _a.sent();
                        throw new Error("Unable to login : ".concat(error_7.message));
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    return UserModel;
}());
exports.default = UserModel;
