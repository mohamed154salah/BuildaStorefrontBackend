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
var order_1 = require("./../models/order");
var authorization_1 = __importDefault(require("../middleware/authorization"));
var dotenv_1 = __importDefault(require("dotenv"));
var order_products_1 = require("./../models/order_products");
dotenv_1.default.config();
var orderStore = new order_1.OrderStore();
var store = new order_products_1.Order_productsStore();
var index = function (_req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var order, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, orderStore.index()];
            case 1:
                order = _a.sent();
                res.json(order);
                return [3 /*break*/, 3];
            case 2:
                error_1 = _a.sent();
                res.status(400).send("error while get orders ".concat(error_1));
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
var show = function (_req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var order, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!_req.query.id) return [3 /*break*/, 5];
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, orderStore.show(parseInt(_req.query.id))];
            case 2:
                order = _a.sent();
                res.json(order);
                return [3 /*break*/, 4];
            case 3:
                err_1 = _a.sent();
                res.status(400).send("".concat(err_1));
                return [3 /*break*/, 4];
            case 4: return [3 /*break*/, 6];
            case 5:
                res.status(400).send("error while get orders no ID added");
                _a.label = 6;
            case 6: return [2 /*return*/];
        }
    });
}); };
var create = function (_req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var order, newOrder, err_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!(_req.body.status && _req.body.user_id)) return [3 /*break*/, 5];
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                order = {
                    status: _req.body.status,
                    user_id: _req.body.user_id,
                };
                return [4 /*yield*/, orderStore.create(order)];
            case 2:
                newOrder = _a.sent();
                res.json(newOrder);
                return [3 /*break*/, 4];
            case 3:
                err_2 = _a.sent();
                res.status(400);
                res.json(err_2);
                return [3 /*break*/, 4];
            case 4: return [3 /*break*/, 6];
            case 5:
                res.status(400).json({ message: "you should send status and user_id" });
                _a.label = 6;
            case 6: return [2 /*return*/];
        }
    });
}); };
var destroy = function (_req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var deleted, err_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!_req.body.id) return [3 /*break*/, 5];
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, orderStore.destroy(_req.body.id)];
            case 2:
                deleted = _a.sent();
                res.json(deleted);
                return [3 /*break*/, 4];
            case 3:
                err_3 = _a.sent();
                res.status(400);
                res.json(err_3);
                return [3 /*break*/, 4];
            case 4: return [3 /*break*/, 6];
            case 5:
                res.status(400).json({ message: "you should send id" });
                _a.label = 6;
            case 6: return [2 /*return*/];
        }
    });
}); };
var addProduct = function (_req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var orderId, productId, quantity, order_product, addedProduct, err_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                orderId = _req.params.id;
                productId = _req.body.productId;
                quantity = parseInt(_req.body.quantity);
                order_product = {
                    order_id: parseInt(orderId),
                    product_id: parseInt(productId),
                    quantity: quantity,
                };
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, store.create(order_product)];
            case 2:
                addedProduct = _a.sent();
                res.json(addedProduct);
                return [3 /*break*/, 4];
            case 3:
                err_4 = _a.sent();
                res.status(400);
                res.json(err_4);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
//get order_product
var getProduct_order = function (_req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var order, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, store.index()];
            case 1:
                order = _a.sent();
                res.json(order);
                return [3 /*break*/, 3];
            case 2:
                error_2 = _a.sent();
                res.status(400).send("error while get orders ".concat(error_2));
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
var orderRoutes = function (app) {
    app.get("/orders", authorization_1.default, index);
    app.get("/order", authorization_1.default, show);
    app.post("/order", authorization_1.default, create);
    app.delete("/order", authorization_1.default, destroy);
    app.get("/or", authorization_1.default, getProduct_order);
    app.post("/orders/:id/products", authorization_1.default, addProduct);
};
exports.default = orderRoutes;
