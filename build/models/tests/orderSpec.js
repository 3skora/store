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
var database_1 = __importDefault(require("../../database"));
var order_model_1 = __importDefault(require("../order.model"));
var user_model_1 = __importDefault(require("../user.model"));
var product_model_1 = __importDefault(require("../product.model"));
var orderProduct_model_1 = __importDefault(require("../orderProduct.model"));
var userModel = new user_model_1.default();
var productModel = new product_model_1.default();
var orderModel = new order_model_1.default();
var orderProductModel = new orderProduct_model_1.default();
describe('Order Model', function () {
    describe('Test CRUD methods exist', function () {
        it('checks if getAll method is defined', function () {
            expect(orderModel.getAll).toBeDefined();
        });
        it('checks if getOrder method is defined', function () {
            expect(orderModel.getOrder).toBeDefined();
        });
        it('checks if getOrder method is defined', function () {
            expect(orderModel.getOrdersOfUser).toBeDefined();
        });
        it('checks if create method is defined', function () {
            expect(orderModel.create).toBeDefined();
        });
        it('checks if updateOrder method is defined', function () {
            expect(orderModel.updateOrderStatus).toBeDefined();
        });
        it('checks if deleteOrder method is defined', function () {
            expect(orderModel.deleteOrder).toBeDefined();
        });
    });
    describe('Test Order Model Logic', function () {
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
            var createdUser, createdProduct, createdOrder, createdOrderProduct;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, userModel.create(testUser)];
                    case 1:
                        createdUser = _a.sent();
                        testUser.id = createdUser.id;
                        return [4 /*yield*/, productModel.create(testProduct)];
                    case 2:
                        createdProduct = _a.sent();
                        testProduct.id = createdProduct.id;
                        testOrder.user_id = createdUser.id;
                        return [4 /*yield*/, orderModel.create(testOrder)];
                    case 3:
                        createdOrder = _a.sent();
                        testOrder.id = createdOrder.id;
                        testOrderProduct.product_id = createdProduct.id;
                        testOrderProduct.order_id = createdOrder.id;
                        return [4 /*yield*/, orderProductModel.create(testOrderProduct)];
                    case 4:
                        createdOrderProduct = _a.sent();
                        createdOrderProduct.id = createdProduct.id;
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
                        return [4 /*yield*/, connection.query(sql)];
                    case 2:
                        _a.sent();
                        connection.release();
                        return [2 /*return*/];
                }
            });
        }); });
        it('Create method should return a New Order', function () { return __awaiter(void 0, void 0, void 0, function () {
            var createdOrder;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, orderModel.create({
                            user_id: testUser.id,
                            status: 'active'
                        })];
                    case 1:
                        createdOrder = _a.sent();
                        expect(createdOrder.user_id).toBe(testUser.id);
                        expect(createdOrder.status).toBe('active');
                        return [2 /*return*/];
                }
            });
        }); });
        it('GetAll method should return All available Orders in DB', function () { return __awaiter(void 0, void 0, void 0, function () {
            var Orders;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, orderModel.getAll()];
                    case 1:
                        Orders = _a.sent();
                        expect(Orders.length).toBe(1);
                        return [2 /*return*/];
                }
            });
        }); });
        it('GetOrder method should return testOrder when called with ID', function () { return __awaiter(void 0, void 0, void 0, function () {
            var returnedOrder;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, orderModel.getOrder(testOrder.id)];
                    case 1:
                        returnedOrder = (_a.sent())[0];
                        expect(returnedOrder === null || returnedOrder === void 0 ? void 0 : returnedOrder.id).toBe(testOrder.id);
                        return [2 /*return*/];
                }
            });
        }); });
        it('UpdateOrder method should return a Order with updated attributes', function () { return __awaiter(void 0, void 0, void 0, function () {
            var updatedOrder;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, orderModel.updateOrderStatus(testOrder.id, __assign(__assign({}, testOrder), { status: 'complete' }))];
                    case 1:
                        updatedOrder = (_a.sent());
                        expect(updatedOrder.id).toBe(testOrder.id);
                        expect(updatedOrder.status).toBe('complete');
                        return [2 /*return*/];
                }
            });
        }); });
        it('DeleteOrder method should delete Order from DB', function () { return __awaiter(void 0, void 0, void 0, function () {
            var deletedOrder;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, orderModel.deleteOrder(testOrder.id)];
                    case 1:
                        deletedOrder = _a.sent();
                        expect(deletedOrder.id).toBe(testOrder.id);
                        return [2 /*return*/];
                }
            });
        }); });
    });
});
