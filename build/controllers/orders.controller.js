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
exports.deleteOrder = exports.updateOrder = exports.getOrdersOfUser = exports.getOrder = exports.getAllOrders = exports.createOrder = void 0;
var order_model_1 = __importDefault(require("../models/order.model"));
var orderModel = new order_model_1.default();
var handleError = function (message, status, next) {
    var error = new Error(message);
    error.status = status;
    next(error);
};
var createOrder = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var newOrder, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, orderModel.create(req.body)];
            case 1:
                newOrder = _a.sent();
                res.json({
                    status: 'success',
                    message: "Order ".concat(newOrder.id, " created successfully"),
                    data: __assign({}, newOrder)
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
exports.createOrder = createOrder;
var getAllOrders = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var allOrders, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, orderModel.getAll()];
            case 1:
                allOrders = _a.sent();
                if (!allOrders)
                    throw new Error();
                res.json({
                    status: 'success',
                    message: "All Orders retrieved successfully",
                    data: allOrders
                });
                return [3 /*break*/, 3];
            case 2:
                error_2 = _a.sent();
                handleError("Orders Not Found", 404, next);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getAllOrders = getAllOrders;
// export const getAllOrders = async (req: Request, res: Response, next: NextFunction) => {
//   try {
//     //validate req.body first
//     const { category } = req.query
//     let allOrders
//     !category
//       ? (allOrders = await orderModel.getAll())
//       : (allOrders = await orderModel.getOrderByCategory(category as string))
//     if (!allOrders) throw new Error()
//     res.json({
//       status: 'success',
//       message: `All Orders retrieved successfully`,
//       data: allOrders
//     })
//   } catch (error) {
//     handleError(`Orders Not Found : No such category`, 404, next)
//   }
// }
var getOrder = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var id, Order, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                id = req.params.id;
                return [4 /*yield*/, orderModel.getOrder(id)];
            case 1:
                Order = _a.sent();
                if (!Order)
                    throw new Error();
                return [2 /*return*/, res.json({
                        status: 'success',
                        message: "Order ".concat(id, " retrieved successfully"),
                        data: Order
                    })];
            case 2:
                error_3 = _a.sent();
                handleError("Order Not Found", 404, next);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getOrder = getOrder;
var getOrdersOfUser = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var id, status_1, Order, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                id = req.params.id;
                status_1 = req.query.status;
                return [4 /*yield*/, orderModel.getOrdersOfUser(id, status_1)];
            case 1:
                Order = _a.sent();
                if (!Order)
                    throw new Error();
                return [2 /*return*/, res.json({
                        status: 'success',
                        message: "Order ".concat(id, " retrieved successfully"),
                        data: Order
                    })];
            case 2:
                error_4 = _a.sent();
                handleError("Order Not Found", 404, next);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getOrdersOfUser = getOrdersOfUser;
var updateOrder = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var id, foundOrder, updatedValues, updatedOrder, error_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                id = req.params.id;
                return [4 /*yield*/, orderModel.getOrder(id)];
            case 1:
                foundOrder = _a.sent();
                updatedValues = __assign(__assign({}, foundOrder), req.body);
                return [4 /*yield*/, orderModel.updateOrderStatus(id, updatedValues)];
            case 2:
                updatedOrder = _a.sent();
                res.json({
                    status: 'success',
                    message: "Order ".concat(id, " updated successfully"),
                    data: updatedOrder
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
exports.updateOrder = updateOrder;
var deleteOrder = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var id, deletedOrder, error_6;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                id = req.params.id;
                return [4 /*yield*/, orderModel.deleteOrder(id)];
            case 1:
                deletedOrder = _a.sent();
                res.json({
                    status: 'success',
                    message: "Order ".concat(id, " deleted successfully"),
                    data: deletedOrder
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
exports.deleteOrder = deleteOrder;
