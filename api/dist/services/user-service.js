"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MyUserService = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@loopback/core");
const repository_1 = require("@loopback/repository");
const rest_1 = require("@loopback/rest");
const security_1 = require("@loopback/security");
const keys_1 = require("../keys");
const user_repository_1 = require("../repositories/user.repository");
const hash_password_1 = require("./hash.password");
let MyUserService = class MyUserService {
    constructor(userRepository, 
    // @inject('service.hasher')
    hasher) {
        this.userRepository = userRepository;
        this.hasher = hasher;
    }
    async verifyCredentials(credentials) {
        // implement this method
        const foundUser = await this.userRepository.findOne({
            where: {
                email: credentials.email
            }
        });
        if (!foundUser) {
            throw new rest_1.HttpErrors.NotFound('user not found');
        }
        const passwordMatched = await this.hasher.comparePassword(credentials.password, foundUser.password);
        if (!passwordMatched)
            throw new rest_1.HttpErrors.Unauthorized('password is not valid');
        return foundUser;
    }
    convertToUserProfile(user) {
        let userName = user.name;
        return {
            [security_1.securityId]: user.id.toString(),
            name: userName,
            id: user.id,
            email: user.email,
            permission: user.role
        };
    }
};
MyUserService = (0, tslib_1.__decorate)([
    (0, tslib_1.__param)(0, (0, repository_1.repository)(user_repository_1.UserRepository)),
    (0, tslib_1.__param)(1, (0, core_1.inject)(keys_1.PasswordHasherBindings.PASSWORD_HASHER)),
    (0, tslib_1.__metadata)("design:paramtypes", [user_repository_1.UserRepository,
        hash_password_1.BcryptHasher])
], MyUserService);
exports.MyUserService = MyUserService;
//# sourceMappingURL=user-service.js.map