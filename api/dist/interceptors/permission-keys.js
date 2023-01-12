"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MY_JWT_ALL = exports.MY_JWT_PLAYER = exports.MY_JWT_ADMIN = void 0;
exports.MY_JWT_ADMIN = {
    strategy: "jwt", options: {
        required: "Admin" /* ADMIN */
    }
};
exports.MY_JWT_PLAYER = {
    strategy: "jwt", options: {
        required: "Player" /* PLAYER */
    }
};
exports.MY_JWT_ALL = {
    strategy: "jwt"
};
//# sourceMappingURL=permission-keys.js.map