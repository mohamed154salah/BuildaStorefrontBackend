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
var order_1 = require("../models/order");
var user_1 = require("../models/user");
var supertest_1 = __importDefault(require("supertest"));
var index_1 = __importDefault(require("../index"));
// create a request object
var request = (0, supertest_1.default)(index_1.default);
var Userstore = new user_1.UserStore();
var store = new order_1.OrderStore();
describe("testing Order Database model ", function () {
    describe("order model function defined", function () {
        it("test create function exists", function () {
            expect(store.create).toBeDefined();
        });
        it("test index function exists", function () {
            expect(store.index).toBeDefined();
        });
        it("test show function exists", function () {
            expect(store.show).toBeDefined();
        });
        it("test delete function exists", function () {
            expect(store.destroy).toBeDefined();
        });
    });
    describe('test show orders', function () {
        var order = {
            status: 'active',
            user_id: 1,
            // eslint-disable-next-line prettier/prettier
        };
        var user = {
            username: "mosalah",
            password_digest: "password_right"
            // eslint-disable-next-line prettier/prettier
        };
        beforeAll(function () { return __awaiter(void 0, void 0, void 0, function () {
            var conn, createUser, createOrder;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, database_1.default.connect()];
                    case 1:
                        conn = _a.sent();
                        return [4 /*yield*/, conn.query("ALTER SEQUENCE orders_id_seq RESTART WITH 1;")];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, conn.query("ALTER SEQUENCE users_id_seq RESTART WITH 1;")];
                    case 3:
                        _a.sent();
                        conn.release();
                        return [4 /*yield*/, Userstore.create(user)];
                    case 4:
                        createUser = _a.sent();
                        return [4 /*yield*/, store.create(order)];
                    case 5:
                        createOrder = _a.sent();
                        order.id = createOrder.id;
                        user.id = createUser.id;
                        return [2 /*return*/];
                }
            });
        }); });
        afterAll(function () { return __awaiter(void 0, void 0, void 0, function () {
            var conn, sql, sql2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, database_1.default.connect()];
                    case 1:
                        conn = _a.sent();
                        sql = "delete from orders;";
                        return [4 /*yield*/, conn.query(sql)];
                    case 2:
                        _a.sent();
                        sql2 = "delete from users;";
                        return [4 /*yield*/, conn.query(sql2)];
                    case 3:
                        _a.sent();
                        conn.release();
                        return [2 /*return*/];
                }
            });
        }); });
        it("test show order when get right id", function () { return __awaiter(void 0, void 0, void 0, function () {
            var orders;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log(order.id + "bye");
                        return [4 /*yield*/, store.show(order.id)];
                    case 1:
                        orders = _a.sent();
                        expect(orders === null || orders === void 0 ? void 0 : orders.status).toBe("active");
                        expect(String(orders === null || orders === void 0 ? void 0 : orders.user_id)).toBe("1");
                        return [2 /*return*/];
                }
            });
        }); });
    });
});
describe("test order api", function () {
    var order = {
        status: 'active',
        user_id: 1,
        // eslint-disable-next-line prettier/prettier
    };
    var user = {
        username: "mosalah",
        password_digest: "password_right"
        // eslint-disable-next-line prettier/prettier
    };
    beforeAll(function () { return __awaiter(void 0, void 0, void 0, function () {
        var conn, createUser, createOrder;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, database_1.default.connect()];
                case 1:
                    conn = _a.sent();
                    return [4 /*yield*/, conn.query("ALTER SEQUENCE orders_id_seq RESTART WITH 1;")];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, conn.query("ALTER SEQUENCE users_id_seq RESTART WITH 1;")];
                case 3:
                    _a.sent();
                    conn.release();
                    return [4 /*yield*/, Userstore.create(user)];
                case 4:
                    createUser = _a.sent();
                    return [4 /*yield*/, store.create(order)];
                case 5:
                    createOrder = _a.sent();
                    order.id = createOrder.id;
                    user.id = createUser.id;
                    return [2 /*return*/];
            }
        });
    }); });
    afterAll(function () { return __awaiter(void 0, void 0, void 0, function () {
        var conn, sql, sql2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, database_1.default.connect()];
                case 1:
                    conn = _a.sent();
                    sql = "delete from orders;";
                    return [4 /*yield*/, conn.query(sql)];
                case 2:
                    _a.sent();
                    sql2 = "delete from users;";
                    return [4 /*yield*/, conn.query(sql2)];
                case 3:
                    _a.sent();
                    conn.release();
                    return [2 /*return*/];
            }
        });
    }); });
    it("test index function work", function () { return __awaiter(void 0, void 0, void 0, function () {
        var res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, request.get('/orders')
                        .set("Content-Type", "application/json")];
                case 1:
                    res = _a.sent();
                    expect(res.status).toBe(200);
                    expect(res.body).toBeInstanceOf(Array);
                    return [2 /*return*/];
            }
        });
    }); });
    it("test show function work", function () { return __awaiter(void 0, void 0, void 0, function () {
        var res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, request.get('/order')
                        .set("Content-Type", "application/json")
                        .send({ id: "1" })];
                case 1:
                    res = _a.sent();
                    expect(res.status).toBe(200);
                    expect(res.body).toBeInstanceOf(Object);
                    return [2 /*return*/];
            }
        });
    }); });
    it("test show function not work", function () { return __awaiter(void 0, void 0, void 0, function () {
        var res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, request.get('/product')
                        .set("Content-Type", "application/json")
                        .send({ id: "100" })];
                case 1:
                    res = _a.sent();
                    console.log(res.body);
                    expect(res.status).toBe(400);
                    expect(res.body).toBeInstanceOf(Object);
                    return [2 /*return*/];
            }
        });
    }); });
});
