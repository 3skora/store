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
var supertest_1 = __importDefault(require("supertest"));
var database_1 = __importDefault(require("../../database"));
var index_1 = __importDefault(require("../../index"));
var product_model_1 = __importDefault(require("../../models/product.model"));
var user_model_1 = __importDefault(require("../../models/user.model"));
var order_model_1 = __importDefault(require("../../models/order.model"));
var orderProduct_model_1 = __importDefault(require("../../models/orderProduct.model"));
var userModel = new user_model_1.default();
var productModel = new product_model_1.default();
var orderModel = new order_model_1.default();
var orderProductModel = new orderProduct_model_1.default();
var request = (0, supertest_1.default)(index_1.default);
var token = '';
describe('Order API Endpoints', function () {
    var testUser = {
        email: 'test@test.com',
        user_name: 'testUser',
        first_name: 'Test',
        last_name: 'User',
        password: 'test123'
    };
    var testProduct = {
        name: 'test name',
        price: 10.5,
        category: 'test category',
        description: 'test description'
    };
    var testOrderProduct = {
        quantity: 4
    };
    var testOrder = {
        status: 'active'
    };
    beforeAll(function () { return __awaiter(void 0, void 0, void 0, function () {
        var createdUser, res, createdProduct, createdOrder, createdOrderProduct;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, userModel.create(testUser)];
                case 1:
                    createdUser = _a.sent();
                    testUser.id = createdUser.id;
                    return [4 /*yield*/, request.post('/api/users/login').send({
                            email: testUser.email,
                            password: testUser.password
                        })];
                case 2:
                    res = _a.sent();
                    token = res.body.data.token;
                    return [4 /*yield*/, productModel.create(testProduct)];
                case 3:
                    createdProduct = _a.sent();
                    testProduct.id = createdProduct.id;
                    testOrder.user_id = createdUser.id;
                    return [4 /*yield*/, orderModel.create(testOrder)];
                case 4:
                    createdOrder = _a.sent();
                    testOrder.id = createdOrder.id;
                    testOrderProduct.product_id = createdProduct.id;
                    testOrderProduct.order_id = createdOrder.id;
                    return [4 /*yield*/, orderProductModel.create(testOrderProduct)];
                case 5:
                    createdOrderProduct = _a.sent();
                    testOrderProduct.id = createdOrderProduct.id;
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
                    sql = 'DELETE FROM orders; DELETE FROM users; DELETE FROM products; DELETE FROM order_product;';
                    // const sql2 = 'DELETE FROM products;'
                    return [4 /*yield*/, connection.query(sql)
                        // await connection.query(sql2)
                    ];
                case 2:
                    // const sql2 = 'DELETE FROM products;'
                    _a.sent();
                    // await connection.query(sql2)
                    connection.release();
                    return [2 /*return*/];
            }
        });
    }); });
    describe('Test CRUD API methods', function () {
        it('should create new order', function () { return __awaiter(void 0, void 0, void 0, function () {
            var res, _a, user_id, status;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, request
                            .post('/api/orders/')
                            .set('Authorization', "Bearer ".concat(token))
                            .send({
                            user_id: testUser.id,
                            status: 'active'
                        })];
                    case 1:
                        res = _b.sent();
                        expect(res.status).toBe(200);
                        _a = res.body.data, user_id = _a.user_id, status = _a.status;
                        expect(user_id).toBe(testUser.id);
                        expect(status).toBe('active');
                        return [2 /*return*/];
                }
            });
        }); });
        it('should get list all orders', function () { return __awaiter(void 0, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, request.get('/api/orders/').set('Authorization', "Bearer ".concat(token))];
                    case 1:
                        res = _a.sent();
                        expect(res.status).toBe(200);
                        expect(res.body.data.length).toBe(1);
                        return [2 /*return*/];
                }
            });
        }); });
        it('should get order info with :id', function () { return __awaiter(void 0, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, request
                            .get("/api/orders/".concat(testOrder.id))
                            .set('Authorization', "Bearer ".concat(token))];
                    case 1:
                        res = _a.sent();
                        expect(res.status).toBe(200);
                        expect(res.body.data[0].user_id).toBe(testOrder.user_id);
                        expect(res.body.data[0].status).toBe(testOrder.status);
                        return [2 /*return*/];
                }
            });
        }); });
        it('should get order info of user with :id', function () { return __awaiter(void 0, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, request
                            .get("/api/orders/users/".concat(testUser.id))
                            .set('Authorization', "Bearer ".concat(token))];
                    case 1:
                        res = _a.sent();
                        expect(res.status).toBe(200);
                        expect(res.body.data[0].user_id).toBe(testUser.id);
                        return [2 /*return*/];
                }
            });
        }); });
        it('should update product info', function () { return __awaiter(void 0, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, request
                            .patch("/api/orders/".concat(testOrder.id))
                            .set('Authorization', "Bearer ".concat(token))
                            .send(__assign(__assign({}, testOrder), { status: 'complete' }))];
                    case 1:
                        res = _a.sent();
                        expect(res.status).toBe(200);
                        expect(res.body.data.status).toBe('complete');
                        return [2 /*return*/];
                }
            });
        }); });
        it('should delete product', function () { return __awaiter(void 0, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, request
                            .delete("/api/orders/".concat(testOrder.id))
                            .set('Authorization', "Bearer ".concat(token))];
                    case 1:
                        res = _a.sent();
                        expect(res.status).toBe(200);
                        expect(res.body.data.id).toBe(testOrder.id);
                        return [2 /*return*/];
                }
            });
        }); });
    });
});
