"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserUpdate = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
let UserUpdate = class UserUpdate extends repository_1.Model {
    constructor(data) {
        super(data);
    }
};
UserUpdate = (0, tslib_1.__decorate)([
    (0, repository_1.model)(),
    (0, tslib_1.__metadata)("design:paramtypes", [Object])
], UserUpdate);
exports.UserUpdate = UserUpdate;
//# sourceMappingURL=user-update.model.js.map