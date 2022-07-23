"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
exports.login = exports.deleteUser = exports.updateUser = exports.updateUserPassword = exports.getUser = exports.getAllUsers = exports.createUser = exports.helloUser = void 0;
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var config_1 = __importDefault(require("../config"));
var user_model_1 = __importDefault(require("../models/user.model"));
var userModel = new user_model_1.default();
var handleError = function (message, status, next) {
    var error = new Error(message);
    error.status = status;
    next(error);
};
var helloUser = function (req, res) {
    res.json({ message: 'hello from users' });
};
exports.helloUser = helloUser;
var createUser = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var newUser, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, userModel.create(req.body)];
            case 1:
                newUser = _a.sent();
                res.json({
                    status: 'success',
                    message: "user ".concat(newUser.user_name, " created successfully"),
                    data: __assign({}, newUser)
                });
                return [3 /*break*/, 3];
            case 2:
                error_1 = _a.sent();
                next(error_1);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.createUser = createUser;
var getAllUsers = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var allUsers, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, userModel.getAll()];
            case 1:
                allUsers = _a.sent();
                res.json({
                    status: 'success',
                    message: "All users retrieved successfully",
                    data: allUsers
                });
                return [3 /*break*/, 3];
            case 2:
                error_2 = _a.sent();
                next(error_2);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getAllUsers = getAllUsers;
var getUser = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var id, user, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                id = req.params.id;
                return [4 /*yield*/, userModel.getUser(id)];
            case 1:
                user = _a.sent();
                if (!user)
                    throw new Error();
                return [2 /*return*/, res.json({
                        status: 'success',
                        message: "User ".concat(id, " retrieved successfully"),
                        data: user
                    })];
            case 2:
                error_3 = _a.sent();
                handleError("User Not Found", 404, next);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getUser = getUser;
var updateUserPassword = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var id, password, updatedUser, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                id = req.params.id;
                password = req.body.password;
                return [4 /*yield*/, userModel.updateUserPassword(id, password)];
            case 1:
                updatedUser = _a.sent();
                res.json({
                    status: 'success',
                    message: "Password of user ".concat(id, " updated successfully"),
                    data: updatedUser
                });
                return [3 /*break*/, 3];
            case 2:
                error_4 = _a.sent();
                next(error_4);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.updateUserPassword = updateUserPassword;
var updateUser = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var id, foundUser, updatedValues, updatedUser, error_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                id = req.params.id;
                return [4 /*yield*/, userModel.getUser(id)];
            case 1:
                foundUser = _a.sent();
                updatedValues = __assign(__assign({}, foundUser), req.body);
                return [4 /*yield*/, userModel.updateUser(id, updatedValues)];
            case 2:
                updatedUser = _a.sent();
                res.json({
                    status: 'success',
                    message: "User ".concat(id, " updated successfully"),
                    data: updatedUser
                });
                return [3 /*break*/, 4];
            case 3:
                error_5 = _a.sent();
                next(error_5);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.updateUser = updateUser;
var deleteUser = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var id, deletedUser, error_6;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                id = req.params.id;
                return [4 /*yield*/, userModel.deleteUser(id)];
            case 1:
                deletedUser = _a.sent();
                res.json({
                    status: 'success',
                    message: "User ".concat(id, " deleted successfully"),
                    data: deletedUser
                });
                return [3 /*break*/, 3];
            case 2:
                error_6 = _a.sent();
                next(error_6);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.deleteUser = deleteUser;
var login = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, email, password, userInfo, token, error_7;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                _a = req.body, email = _a.email, password = _a.password;
                return [4 /*yield*/, userModel.login(email, password)];
            case 1:
                userInfo = _b.sent();
                if (!userInfo)
                    throw new Error("email or password does not match");
                token = jsonwebtoken_1.default.sign(userInfo, config_1.default.tokenSecret);
                // req.headers.authorization = token
                return [2 /*return*/, res.json({
                        status: 'success',
                        message: "Logged in ",
                        data: { id: userInfo.id, token: token }
                    })];
            case 2:
                error_7 = _b.sent();
                handleError("email or password does not match", 401, next);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.login = login;
