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
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var user_1 = require("../models/user");
var dotenv_1 = __importDefault(require("dotenv"));
var authorization_1 = __importDefault(require("../middleware/authorization"));
dotenv_1.default.config();
var userRoutes = function (app) {
    app.get("/users", authorization_1.default, index);
    app.get("/user", authorization_1.default, show);
    app.post("/users", authorization_1.default, create);
    app.delete("/users", destroy);
    app.put("/users", update);
    app.post("/users/authenticate", authenticate);
};
var store = new user_1.UserStore();
var index = function (_req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var users;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, store.index()];
            case 1:
                users = _a.sent();
                res.json(users);
                return [2 /*return*/];
        }
    });
}); };
var show = function (_req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, store.show(_req.body.id)];
            case 1:
                user = _a.sent();
                res.json(user);
                return [2 /*return*/];
        }
    });
}); };
var create = function (_req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user, newUser, token, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                user = {
                    username: _req.body.username,
                    password_digest: _req.body.password,
                };
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, store.create(user)];
            case 2:
                newUser = _a.sent();
                token = jsonwebtoken_1.default.sign({ user: newUser }, process.env.TOKEN_SECRET);
                res.json(token);
                return [3 /*break*/, 4];
            case 3:
                err_1 = _a.sent();
                res.status(400);
                // eslint-disable-next-line prettier/prettier
                res.json(err_1 + user);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
var update = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user, authorizationHeader, token, id, updated, err_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                user = {
                    id: parseInt(req.params.id),
                    username: req.body.username,
                    password_digest: req.body.password,
                };
                try {
                    authorizationHeader = req.headers.authorization;
                    token = authorizationHeader.split(' ')[1];
                    id = jsonwebtoken_1.default.verify(token, process.env.TOKEN_SECRET).id;
                    if (parseInt(id) !== user.id) {
                        throw new Error('User id does not match!');
                    }
                }
                catch (err) {
                    res.status(401);
                    res.json(err);
                    return [2 /*return*/];
                }
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, store.create(user)];
            case 2:
                updated = _a.sent();
                res.json(updated);
                return [3 /*break*/, 4];
            case 3:
                err_2 = _a.sent();
                res.status(400);
                res.json(err_2 + user);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
var destroy = function (_req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var deleted;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, store.delete(_req.body.id)];
            case 1:
                deleted = _a.sent();
                res.json(deleted);
                return [2 /*return*/];
        }
    });
}); };
var authenticate = function (_req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user, u, token, err_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                user = {
                    username: _req.body.username,
                    password_digest: _req.body.password,
                };
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, store.authenticate(user.username, user.password_digest)];
            case 2:
                u = _a.sent();
                token = jsonwebtoken_1.default.sign({ user: u }, process.env.TOKEN_SECRET);
                res.json(token);
                return [3 /*break*/, 4];
            case 3:
                err_3 = _a.sent();
                res.status(401);
                res.json(err_3 + user);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.default = userRoutes;
