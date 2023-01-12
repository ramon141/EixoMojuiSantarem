"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const tslib_1 = require("tslib");
const authentication_1 = require("@loopback/authentication");
const authentication_jwt_1 = require("@loopback/authentication-jwt");
const core_1 = require("@loopback/core");
const repository_1 = require("@loopback/repository");
const rest_1 = require("@loopback/rest");
const permission_keys_1 = require("../interceptors/permission-keys");
const keys_1 = require("../keys");
const models_1 = require("../models");
const repositories_1 = require("../repositories");
const hash_password_1 = require("../services/hash.password");
let UserController = class UserController {
    constructor(userRepository, hasher) {
        this.userRepository = userRepository;
        this.hasher = hasher;
    }
    async create(user) {
        user.password = await this.hasher.hashPassword(user.password);
        return this.userRepository.create(user);
    }
    async count(where) {
        return this.userRepository.count(where);
    }
    async find(filter) {
        var filterWithoutPassword = new repository_1.FilterBuilder();
        if (filter) {
            filterWithoutPassword = new repository_1.FilterBuilder(filter);
        }
        filterWithoutPassword.fields({ password: false });
        return this.userRepository.find(filterWithoutPassword.build());
    }
    async findById(id, filter) {
        let user = await this.userRepository.findById(id, filter);
        user.password = "";
        return user;
    }
    async replaceById(id, user) {
        let userDb = await this.userRepository.findById(id);
        userDb.name = user.name;
        userDb.role = user.role;
        userDb.email = user.email;
        userDb.telefone = user.telefone;
        await this.userRepository.update(userDb);
    }
    async replacePasswordById(id, user) {
        let userDb = await this.userRepository.findById(id);
        userDb.password = await this.hasher.hashPassword(user.password);
        await this.userRepository.update(userDb);
    }
    async deleteById(id) {
        await this.userRepository.deleteById(id);
    }
};
(0, tslib_1.__decorate)([
    (0, authentication_1.authenticate)(permission_keys_1.MY_JWT_ADMIN),
    (0, rest_1.post)('/admin/users'),
    (0, rest_1.response)(200, {
        security: authentication_jwt_1.OPERATION_SECURITY_SPEC,
        description: 'User model instance',
        content: { 'application/json': { schema: (0, rest_1.getModelSchemaRef)(models_1.User) } },
    }),
    (0, tslib_1.__param)(0, (0, rest_1.requestBody)({
        content: {
            'application/json': {
                schema: (0, rest_1.getModelSchemaRef)(models_1.User, {
                    title: 'NewUser'
                }),
            },
        },
    })),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Object]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], UserController.prototype, "create", null);
(0, tslib_1.__decorate)([
    (0, authentication_1.authenticate)(permission_keys_1.MY_JWT_ADMIN),
    (0, rest_1.get)('/admin/users/count'),
    (0, rest_1.response)(200, {
        security: authentication_jwt_1.OPERATION_SECURITY_SPEC,
        description: 'User model count',
        content: { 'application/json': { schema: repository_1.CountSchema } },
    }),
    (0, tslib_1.__param)(0, rest_1.param.where(models_1.User)),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Object]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], UserController.prototype, "count", null);
(0, tslib_1.__decorate)([
    (0, authentication_1.authenticate)(permission_keys_1.MY_JWT_ADMIN),
    (0, rest_1.get)('/admin/users'),
    (0, rest_1.response)(200, {
        security: authentication_jwt_1.OPERATION_SECURITY_SPEC,
        description: 'Array of User model instances',
        content: {
            'application/json': {
                schema: {
                    type: 'array',
                    items: (0, rest_1.getModelSchemaRef)(models_1.User, { includeRelations: true }),
                },
            },
        },
    }),
    (0, tslib_1.__param)(0, rest_1.param.filter(models_1.User)),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Object]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], UserController.prototype, "find", null);
(0, tslib_1.__decorate)([
    (0, authentication_1.authenticate)(permission_keys_1.MY_JWT_ADMIN),
    (0, rest_1.get)('/admin/users/{id}'),
    (0, rest_1.response)(200, {
        security: authentication_jwt_1.OPERATION_SECURITY_SPEC,
        description: 'User model instance',
        content: {
            'application/json': {
                schema: (0, rest_1.getModelSchemaRef)(models_1.User, { includeRelations: true }),
            },
        },
    }),
    (0, tslib_1.__param)(0, rest_1.param.path.string('id')),
    (0, tslib_1.__param)(1, rest_1.param.filter(models_1.User, { exclude: 'where' })),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [String, Object]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], UserController.prototype, "findById", null);
(0, tslib_1.__decorate)([
    (0, authentication_1.authenticate)(permission_keys_1.MY_JWT_ADMIN),
    (0, rest_1.put)('/admin/users/{id}'),
    (0, rest_1.response)(204, {
        security: authentication_jwt_1.OPERATION_SECURITY_SPEC,
        description: 'User user data',
    }),
    (0, tslib_1.__param)(0, rest_1.param.path.string('id')),
    (0, tslib_1.__param)(1, (0, rest_1.requestBody)()),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [String, models_1.User]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], UserController.prototype, "replaceById", null);
(0, tslib_1.__decorate)([
    (0, authentication_1.authenticate)(permission_keys_1.MY_JWT_ADMIN),
    (0, rest_1.put)('/admin/users/{id}/password'),
    (0, rest_1.response)(204, {
        security: authentication_jwt_1.OPERATION_SECURITY_SPEC,
        description: 'Update user password',
    }),
    (0, tslib_1.__param)(0, rest_1.param.path.string('id')),
    (0, tslib_1.__param)(1, (0, rest_1.requestBody)()),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [String, models_1.User]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], UserController.prototype, "replacePasswordById", null);
(0, tslib_1.__decorate)([
    (0, authentication_1.authenticate)(permission_keys_1.MY_JWT_ADMIN),
    (0, rest_1.del)('/admin/users/{id}'),
    (0, rest_1.response)(204, {
        security: authentication_jwt_1.OPERATION_SECURITY_SPEC,
        description: 'User DELETE success',
    }),
    (0, tslib_1.__param)(0, rest_1.param.path.string('id')),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [String]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], UserController.prototype, "deleteById", null);
UserController = (0, tslib_1.__decorate)([
    (0, tslib_1.__param)(0, (0, repository_1.repository)(repositories_1.UserRepository)),
    (0, tslib_1.__param)(1, (0, core_1.inject)(keys_1.PasswordHasherBindings.PASSWORD_HASHER)),
    (0, tslib_1.__metadata)("design:paramtypes", [repositories_1.UserRepository,
        hash_password_1.BcryptHasher])
], UserController);
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map