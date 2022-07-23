"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var morgan_1 = __importDefault(require("morgan"));
var helmet_1 = __importDefault(require("helmet"));
var express_rate_limit_1 = __importDefault(require("express-rate-limit"));
var error_middleware_1 = __importDefault(require("./middleware/error.middleware"));
var config_1 = __importDefault(require("./config"));
var routes_1 = __importDefault(require("./routes"));
var PORT = config_1.default.port;
// create an instance server
var app = (0, express_1.default)();
// Middleware
// Middleware to pare incoming requests
app.use(express_1.default.json());
// HTTP request logger middleware
app.use((0, morgan_1.default)('short'));
// HTTP security middleware
app.use((0, helmet_1.default)());
var limiter = (0, express_rate_limit_1.default)({
    windowMs: 15 * 60 * 1000,
    max: 100,
    standardHeaders: true,
    legacyHeaders: false,
    message: 'too many requests, please try after 15 min'
});
app.use(limiter);
app.use('/api', routes_1.default);
// add routing for / path
app.get('/', function (_req, res) {
    res.json({
        message: 'Hello World'
    });
});
app.get('/err', function (_req, res) {
    throw new Error('hhhhhhhhh');
    // res.json({
    //   message: 'Hello World'
    // })
});
//add all routes here
//================
// Handle error for route not exist
app.use(function (_req, res) {
    res.status(404).json({
        message: 'Page Not Found'
    });
});
app.use(error_middleware_1.default);
// start express server
app.listen(PORT, function () {
    console.log("Server is starting at prot:".concat(PORT));
});
exports.default = app;
