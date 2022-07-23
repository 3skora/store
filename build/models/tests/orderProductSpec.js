"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var orderProduct_model_1 = __importDefault(require("../orderProduct.model"));
var orderProductModel = new orderProduct_model_1.default();
describe('Order-Product Model', function () {
    describe('Test CRUD methods exist', function () {
        it('checks if getAll method is defined', function () {
            expect(orderProductModel.getAll).toBeDefined();
        });
        it('checks if getOrderProduct method is defined', function () {
            expect(orderProductModel.getOrderProduct).toBeDefined();
        });
        it('checks if create method is defined', function () {
            expect(orderProductModel.create).toBeDefined();
        });
        it('checks if updateOrderProduct method is defined', function () {
            expect(orderProductModel.updateOrderProductQuantity).toBeDefined();
        });
        it('checks if deleteOrderProduct method is defined', function () {
            expect(orderProductModel.deleteOrderProduct).toBeDefined();
        });
    });
});
