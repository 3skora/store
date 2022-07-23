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
var user_model_1 = __importDefault(require("../user.model"));
var database_1 = __importDefault(require("../../database"));
var userModel = new user_model_1.default();
describe('User Model', function () {
    describe('Test CRUD methods exist', function () {
        it('checks if getAll method is defined', function () {
            expect(userModel.getAll).toBeDefined();
        });
        it('checks if getUser method is defined', function () {
            expect(userModel.getUser).toBeDefined();
        });
        it('checks if create method is defined', function () {
            expect(userModel.create).toBeDefined();
        });
        it('checks if updateUser method is defined', function () {
            expect(userModel.updateUser).toBeDefined();
        });
        it('checks if deleteUser method is defined', function () {
            expect(userModel.deleteUser).toBeDefined();
        });
        it('checks if login method is defined', function () {
            expect(userModel.login).toBeDefined();
        });
    });
    describe('Test User Model Logic', function () {
        var testUser = {
            email: 'test@test.com',
            user_name: 'testUser',
            first_name: 'Test',
            last_name: 'User',
            password: 'test123'
        };
        beforeAll(function () { return __awaiter(void 0, void 0, void 0, function () {
            var createdUser;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, userModel.create(testUser)];
                    case 1:
                        createdUser = _a.sent();
                        testUser.id = createdUser.id;
                        return [2 /*return*/];
                }
            });
        }); });
        afterAll(function () { return __awaiter(void 0, void 0, void 0, function () {
            var connection, sql;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, database_1.default.connect()];
                    case 1:
                        connection = _a.sent();
                        sql = 'DELETE FROM users;';
                        return [4 /*yield*/, connection.query(sql)];
                    case 2:
                        _a.sent();
                        connection.release();
                        return [2 /*return*/];
                }
            });
        }); });
        it('Create method should return a New User', function () { return __awaiter(void 0, void 0, void 0, function () {
            var createdUser;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, userModel.create({
                            email: 'test2@test.com',
                            user_name: 'test2User',
                            first_name: 'Test',
                            last_name: 'User',
                            password: 'test123'
                        })];
                    case 1:
                        createdUser = _a.sent();
                        expect(createdUser).toEqual({
                            id: createdUser.id,
                            email: 'test2@test.com',
                            user_name: 'test2User',
                            first_name: 'Test',
                            last_name: 'User'
                        });
                        return [2 /*return*/];
                }
            });
        }); });
        it('GetAll method should return All available users in DB', function () { return __awaiter(void 0, void 0, void 0, function () {
            var users;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, userModel.getAll()];
                    case 1:
                        users = _a.sent();
                        expect(users.length).toBe(2);
                        return [2 /*return*/];
                }
            });
        }); });
        it('GetUser method should return testUser when called with ID', function () { return __awaiter(void 0, void 0, void 0, function () {
            var returnedUser;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, userModel.getUser(testUser.id)];
                    case 1:
                        returnedUser = _a.sent();
                        expect(returnedUser === null || returnedUser === void 0 ? void 0 : returnedUser.id).toBe(testUser.id);
                        expect(returnedUser === null || returnedUser === void 0 ? void 0 : returnedUser.email).toBe(testUser.email);
                        expect(returnedUser === null || returnedUser === void 0 ? void 0 : returnedUser.user_name).toBe(testUser.user_name);
                        expect(returnedUser === null || returnedUser === void 0 ? void 0 : returnedUser.first_name).toBe(testUser.first_name);
                        expect(returnedUser === null || returnedUser === void 0 ? void 0 : returnedUser.last_name).toBe(testUser.last_name);
                        return [2 /*return*/];
                }
            });
        }); });
        it('Login method should return the authenticated user', function () { return __awaiter(void 0, void 0, void 0, function () {
            var authenticatedUser;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, userModel.login(testUser.email, testUser.password)];
                    case 1:
                        authenticatedUser = _a.sent();
                        expect(authenticatedUser === null || authenticatedUser === void 0 ? void 0 : authenticatedUser.email).toBe(testUser.email);
                        expect(authenticatedUser === null || authenticatedUser === void 0 ? void 0 : authenticatedUser.user_name).toBe(testUser.user_name);
                        expect(authenticatedUser === null || authenticatedUser === void 0 ? void 0 : authenticatedUser.first_name).toBe(testUser.first_name);
                        expect(authenticatedUser === null || authenticatedUser === void 0 ? void 0 : authenticatedUser.last_name).toBe(testUser.last_name);
                        return [2 /*return*/];
                }
            });
        }); });
        it('Login method should return null for wrong credentials', function () { return __awaiter(void 0, void 0, void 0, function () {
            var authenticatedUser;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, userModel.login('fake@fake.com', 'fake123')];
                    case 1:
                        authenticatedUser = _a.sent();
                        expect(authenticatedUser).toBe(null);
                        return [2 /*return*/];
                }
            });
        }); });
        it('UpdateUser method should return a user with updated attributes', function () { return __awaiter(void 0, void 0, void 0, function () {
            var updatedUser;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, userModel.updateUser(testUser.id, __assign(__assign({}, testUser), { user_name: 'testUser Updated', first_name: 'test Updated', last_name: 'user Updated' }))];
                    case 1:
                        updatedUser = _a.sent();
                        expect(updatedUser.id).toBe(testUser.id);
                        expect(updatedUser.email).toBe(testUser.email);
                        expect(updatedUser.user_name).toBe('testUser Updated');
                        expect(updatedUser.first_name).toBe('test Updated');
                        expect(updatedUser.last_name).toBe('user Updated');
                        return [2 /*return*/];
                }
            });
        }); });
        it('DeleteUser method should delete user from DB', function () { return __awaiter(void 0, void 0, void 0, function () {
            var deletedUser;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, userModel.deleteUser(testUser.id)];
                    case 1:
                        deletedUser = _a.sent();
                        expect(deletedUser.id).toBe(testUser.id);
                        return [2 /*return*/];
                }
            });
        }); });
    });
});
