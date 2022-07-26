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
exports.deleteOrderProduct = exports.updateOrderProductQuantity = exports.getOrderProduct = exports.getAllOrderProducts = exports.createOrderProduct = void 0;
var orderProduct_model_1 = __importDefault(require("../models/orderProduct.model"));
var orderProductModel = new orderProduct_model_1.default();
var handleError = function (message, status, next) {
    var error = new Error(message);
    error.status = status;
    next(error);
};
var createOrderProduct = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var newOrderProduct, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, orderProductModel.create(req.body)];
            case 1:
                newOrderProduct = _a.sent();
                res.json({
                    status: 'success',
                    message: "OrderProduct ".concat(newOrderProduct.id, " created successfully"),
                    data: __assign({}, newOrderProduct)
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
exports.createOrderProduct = createOrderProduct;
var getAllOrderProducts = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var allOrderProducts, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, orderProductModel.getAll()];
            case 1:
                allOrderProducts = _a.sent();
                if (!allOrderProducts)
                    throw new Error();
                res.json({
                    status: 'success',
                    message: "All OrderProducts retrieved successfully",
                    data: allOrderProducts
                });
                return [3 /*break*/, 3];
            case 2:
                error_2 = _a.sent();
                handleError("OrderProducts Not Found", 404, next);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getAllOrderProducts = getAllOrderProducts;
var getOrderProduct = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var id, OrderProduct, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                id = req.params.id;
                return [4 /*yield*/, orderProductModel.getOrderProduct(id)];
            case 1:
                OrderProduct = _a.sent();
                if (!OrderProduct)
                    throw new Error();
                return [2 /*return*/, res.json({
                        status: 'success',
                        message: "OrderProduct ".concat(id, " retrieved successfully"),
                        data: OrderProduct
                    })];
            case 2:
                error_3 = _a.sent();
                handleError("OrderProduct Not Found", 404, next);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getOrderProduct = getOrderProduct;
// export const getOrderProductsOfUser = async (req: Request, res: Response, next: NextFunction) => {
//   try {
//     const { id } = req.params
//     const { status } = req.query
//     const OrderProduct = await orderProductModel.(id, status as unknown as string)
//     if (!OrderProduct) throw new Error()
//     return res.json({
//       status: 'success',
//       message: `OrderProduct ${id} retrieved successfully`,
//       data: OrderProduct
//     })
//   } catch (error) {
//     handleError(`OrderProduct Not Found`, 404, next)
//   }
// }
var updateOrderProductQuantity = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var id, foundOrderProduct, updatedValues, updatedOrderProduct, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                id = req.params.id;
                return [4 /*yield*/, orderProductModel.getOrderProduct(id)];
            case 1:
                foundOrderProduct = _a.sent();
                updatedValues = __assign(__assign({}, foundOrderProduct), req.body);
                return [4 /*yield*/, orderProductModel.updateOrderProductQuantity(id, updatedValues)];
            case 2:
                updatedOrderProduct = _a.sent();
                res.json({
                    status: 'success',
                    message: "OrderProduct ".concat(id, " updated successfully"),
                    data: updatedOrderProduct
                });
                return [3 /*break*/, 4];
            case 3:
                error_4 = _a.sent();
                next(error_4);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.updateOrderProductQuantity = updateOrderProductQuantity;
var deleteOrderProduct = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var id, deletedOrderProduct, error_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                id = req.params.id;
                return [4 /*yield*/, orderProductModel.deleteOrderProduct(id)];
            case 1:
                deletedOrderProduct = _a.sent();
                res.json({
                    status: 'success',
                    message: "OrderProduct ".concat(id, " deleted successfully"),
                    data: deletedOrderProduct
                });
                return [3 /*break*/, 3];
            case 2:
                error_5 = _a.sent();
                next(error_5);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.deleteOrderProduct = deleteOrderProduct;
