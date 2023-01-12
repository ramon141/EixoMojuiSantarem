"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SecureController = void 0;
const tslib_1 = require("tslib");
const authentication_1 = require("@loopback/authentication");
const core_1 = require("@loopback/core");
const repository_1 = require("@loopback/repository");
const rest_1 = require("@loopback/rest");
const _ = (0, tslib_1.__importStar)(require("lodash"));
const keys_1 = require("../keys");
const models_1 = require("../models");
const repositories_1 = require("../repositories");
const services_1 = require("../services");
const hash_password_1 = require("../services/hash.password");
const jwt_service_1 = require("../services/jwt-service");
const user_service_1 = require("../services/user-service");
const security_spec_1 = require("../utils/security-spec");
let SecureController = class SecureController {
    constructor(userRepository, 
    // @inject('service.hasher')
    hasher, 
    // @inject('service.user.service')
    userService, 
    // @inject('service.jwt.service')
    jwtService) {
        this.userRepository = userRepository;
        this.hasher = hasher;
        this.userService = userService;
        this.jwtService = jwtService;
    }
    async signup(userData) {
        (0, services_1.validateCredentials)(_.pick(userData, ['name', 'email', 'password']));
        const existUser = await this.userRepository.findOne({ where: { email: userData.email.trim() } });
        if (existUser) {
            throw new rest_1.HttpErrors.UnprocessableEntity('já existe usuário com esse login');
        }
        userData.role = "Player" /* PLAYER */;
        userData.email = userData.email.trim();
        userData.password = await this.hasher.hashPassword(userData.password);
        const { password, ...savedUser } = await this.userRepository.create(userData);
        return savedUser;
    }
    async login(credentials) {
        // make sure user exist,password should be valid
        const user = await this.userService.verifyCredentials(credentials);
        // console.log(user);
        const userProfile = await this.userService.convertToUserProfile(user);
        // console.log(userProfile);
        const token = await this.jwtService.generateToken(userProfile);
        return Promise.resolve({ token: token });
    }
    async profile(currentUser) {
        return Promise.resolve(currentUser);
    }
};
(0, tslib_1.__decorate)([
    (0, rest_1.post)('/signup', {
        responses: {
            '200': {
                description: 'User',
                content: { 'application/json': { schema: (0, rest_1.getModelSchemaRef)(models_1.User) } },
            }
        }
    }),
    (0, tslib_1.__param)(0, (0, rest_1.requestBody)({
        content: {
            'application/json': {
                schema: (0, rest_1.getModelSchemaRef)(models_1.User, {
                    title: 'NewUser',
                    exclude: ['id', "role"],
                }),
            },
        },
    })),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Object]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], SecureController.prototype, "signup", null);
(0, tslib_1.__decorate)([
    (0, rest_1.post)('/login', {
        responses: {
            '200': {
                description: 'Token',
                content: {
                    'application/json': {
                        schema: {
                            type: 'object',
                            properties: {
                                token: {
                                    type: 'string'
                                }
                            }
                        }
                    }
                }
            }
        }
    }),
    (0, tslib_1.__param)(0, (0, rest_1.requestBody)()),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Object]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], SecureController.prototype, "login", null);
(0, tslib_1.__decorate)([
    (0, authentication_1.authenticate)("jwt"),
    (0, rest_1.get)('/profile', {
        security: security_spec_1.OPERATION_SECURITY_SPEC,
        responses: {
            '200': {
                description: 'The current user profile',
                content: {
                    'application/json': {
                        schema: (0, rest_1.getJsonSchemaRef)(models_1.User),
                    },
                },
            },
        },
    }),
    (0, tslib_1.__param)(0, (0, core_1.inject)(authentication_1.AuthenticationBindings.CURRENT_USER)),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Object]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], SecureController.prototype, "profile", null);
SecureController = (0, tslib_1.__decorate)([
    (0, tslib_1.__param)(0, (0, repository_1.repository)(repositories_1.UserRepository)),
    (0, tslib_1.__param)(1, (0, core_1.inject)(keys_1.PasswordHasherBindings.PASSWORD_HASHER)),
    (0, tslib_1.__param)(2, (0, core_1.inject)(keys_1.UserServiceBindings.USER_SERVICE)),
    (0, tslib_1.__param)(3, (0, core_1.inject)(keys_1.TokenServiceBindings.TOKEN_SERVICE)),
    (0, tslib_1.__metadata)("design:paramtypes", [repositories_1.UserRepository,
        hash_password_1.BcryptHasher,
        user_service_1.MyUserService,
        jwt_service_1.JWTService])
], SecureController);
exports.SecureController = SecureController;
//# sourceMappingURL=secure.controller.js.map