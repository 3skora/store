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
var database_1 = __importDefault(require("../database"));
var OrderModel = /** @class */ (function () {
    function OrderModel() {
        this.table = 'orders';
        this.info = 'id,user_id,status';
        this.orderProductInfo = 'product_id,quantity';
        this.joinedTables = 'orders o INNER JOIN order_product op ON o.id = op.order_id';
        this.joinedInfo = "o.id,user_id,status,".concat(this.orderProductInfo);
    }
    //create Order
    OrderModel.prototype.create = function (o) {
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
                        sql = "INSERT INTO ".concat(this.table, " (user_id,status)\n           VALUES ($1,$2) RETURNING ").concat(this.info);
                        return [4 /*yield*/, conn.query(sql, [o.user_id, o.status])
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
                        throw new Error("Unable to create order to user ".concat(o.user_id, " : ").concat(error_1.message));
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    //get all Orders
    OrderModel.prototype.getAll = function () {
        return __awaiter(this, void 0, void 0, function () {
            var conn, sql, result, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, database_1.default.connect()];
                    case 1:
                        conn = _a.sent();
                        sql = "SELECT ".concat(this.joinedInfo, " FROM ").concat(this.joinedTables);
                        return [4 /*yield*/, conn.query(sql)];
                    case 2:
                        result = _a.sent();
                        conn.release();
                        return [2 /*return*/, result.rows];
                    case 3:
                        error_2 = _a.sent();
                        throw new Error("Unable to retrieve all Orders : ".concat(error_2.message));
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    //get specific Order
    OrderModel.prototype.getOrder = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var conn, sql, result, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, database_1.default.connect()];
                    case 1:
                        conn = _a.sent();
                        sql = "SELECT ".concat(this.joinedInfo, " FROM ").concat(this.joinedTables, " WHERE o.id=$1");
                        return [4 /*yield*/, conn.query(sql, [id])];
                    case 2:
                        result = _a.sent();
                        conn.release();
                        return [2 /*return*/, result.rows.length ? result.rows : null];
                    case 3:
                        error_3 = _a.sent();
                        throw new Error("Unable to retrieve Order ".concat(id, " : ").concat(error_3.message));
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    //get all orders of a user and filter by status option
    OrderModel.prototype.getOrdersOfUser = function (user_id, status) {
        return __awaiter(this, void 0, void 0, function () {
            var conn, condition, sql, result, _a, error_4;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 6, , 7]);
                        return [4 /*yield*/, database_1.default.connect()];
                    case 1:
                        conn = _b.sent();
                        condition = "AND o.status=$2";
                        if (!status)
                            condition = '';
                        sql = "SELECT ".concat(this.joinedInfo, " FROM ").concat(this.joinedTables, " WHERE o.user_id=$1 ").concat(condition);
                        result = void 0;
                        if (!status) return [3 /*break*/, 3];
                        return [4 /*yield*/, conn.query(sql, [user_id, status])];
                    case 2:
                        _a = (result = _b.sent());
                        return [3 /*break*/, 5];
                    case 3: return [4 /*yield*/, conn.query(sql, [user_id])];
                    case 4:
                        _a = (result = _b.sent());
                        _b.label = 5;
                    case 5:
                        _a;
                        conn.release();
                        return [2 /*return*/, result.rows.length ? result.rows : null];
                    case 6:
                        error_4 = _b.sent();
                        throw new Error("Unable to retrieve Orders of ".concat(user_id, " : ").concat(error_4.message));
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    //update Order
    OrderModel.prototype.updateOrderStatus = function (id, o) {
        return __awaiter(this, void 0, void 0, function () {
            var conn, sql, result, error_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, database_1.default.connect()];
                    case 1:
                        conn = _a.sent();
                        sql = "UPDATE ".concat(this.table, " SET status=$1 WHERE id=$2 RETURNING ").concat(this.info);
                        return [4 /*yield*/, conn.query(sql, [o.status, id])];
                    case 2:
                        result = _a.sent();
                        conn.release();
                        return [2 /*return*/, result.rows[0]];
                    case 3:
                        error_5 = _a.sent();
                        throw new Error("Can Not UPDATE status of Order ".concat(o.id, " : ").concat(error_5.message));
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    //delete Order
    OrderModel.prototype.deleteOrder = function (id) {
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
                        throw new Error("Can Not DELETE Order ".concat(id, " : ").concat(error_6.message));
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    return OrderModel;
}());
exports.default = OrderModel;
