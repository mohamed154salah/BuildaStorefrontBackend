"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
var authorization = function (req, res, next) {
    try {
        var authorizationHeader = req.headers.authorization;
        // eslint-disable-next-line prettier/prettier
        var token = authorizationHeader.split(' ')[1];
        jsonwebtoken_1.default.verify(token, process.env.TOKEN_SECRET);
    }
    catch (err) {
        res.status(401);
        res.json(err + "hhh");
        return;
    }
    next();
};
exports.default = authorization;
