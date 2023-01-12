"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateCredentials = void 0;
const rest_1 = require("@loopback/rest");
function validateCredentials(credentials) {
    if (credentials && credentials.email && credentials.email.trim().length < 3) {
        throw new rest_1.HttpErrors.UnprocessableEntity('login deve ter pelo menos 3 caracteres');
    }
    if (credentials && credentials.password && credentials.password.length < 8) {
        throw new rest_1.HttpErrors.UnprocessableEntity('senha deve ter pelo menos 8 caracteres');
    }
}
exports.validateCredentials = validateCredentials;
//# sourceMappingURL=validator.service.js.map