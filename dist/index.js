"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const body_parser_1 = __importDefault(require("body-parser"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const compression_1 = __importDefault(require("compression"));
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
const router_1 = __importDefault(require("./router"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    credentials: true,
}));
app.use((0, compression_1.default)());
app.use((0, cookie_parser_1.default)());
app.use(body_parser_1.default.json());
app.use('/', (0, router_1.default)());
const preferredPort = Number(process.env.PORT) || 8080;
const startServer = (port) => {
    const server = http_1.default.createServer(app);
    server.on('error', (error) => {
        if (error.code === 'EADDRINUSE') {
            const nextPort = port + 1;
            console.warn(`Port ${port} is already in use. Trying ${nextPort} instead.`);
            startServer(nextPort);
            return;
        }
        console.error('Server startup error:', error);
        process.exit(1);
    });
    server.listen(port, () => {
        console.log(`Server is running on http://localhost:${port}/`);
    });
};
mongoose_1.default.Promise = Promise;
if (process.env.MONGO_URI) {
    mongoose_1.default.connect(process.env.MONGO_URI)
        .then(() => {
        console.log('MongoDB Connected Successfully');
    })
        .catch((error) => {
        console.error('MongoDB Connection Error:', error);
    });
    mongoose_1.default.connection.on('error', (error) => {
        console.error(error);
    });
}
else {
    console.warn('MONGO_URI is not configured. Server will start without a database connection.');
}
startServer(preferredPort);
//# sourceMappingURL=index.js.map