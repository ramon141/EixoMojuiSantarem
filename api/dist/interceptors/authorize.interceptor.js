"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthorizeInterceptor = void 0;
const tslib_1 = require("tslib");
const authentication_1 = require("@loopback/authentication");
const context_1 = require("@loopback/context");
const rest_1 = require("@loopback/rest");
/**
 * This class will be bound to the application as an `Interceptor` during
 * `boot`
 */
let AuthorizeInterceptor = class AuthorizeInterceptor {
    constructor(metadatas, 
    // dependency inject
    getCurrentUser) {
        this.metadatas = metadatas;
        this.getCurrentUser = getCurrentUser;
    }
    /**
     * This method is used by LoopBack context to produce an interceptor function
     * for the binding.
     *
     * @returns An interceptor function
     */
    value() {
        return this.intercept.bind(this);
    }
    /**
     * The logic to intercept an invocation
     * @param invocationCtx - Invocation context
     * @param next - A function to invoke next interceptor or the target method
     */
    async intercept(invocationCtx, next) {
        // eslint-disable-next-line no-useless-catch
        try {
            // Add pre-invocation logic here
            // if you not provide options in your @authenticate decorator
            if (!this.metadatas)
                return next();
            if (!this.metadatas[0].options)
                return next();
            const requriedPermissions = this.metadatas[0].options;
            const user = await this.getCurrentUser();
            if (requriedPermissions.required !== undefined &&
                requriedPermissions.required !== user.permission) {
                throw new rest_1.HttpErrors.Forbidden('INVALID ACCESS');
            }
            const result = await next();
            // Add post-invocation logic here
            return result;
        }
        catch (err) {
            // Add error handling logic here
            throw err;
        }
    }
};
AuthorizeInterceptor = (0, tslib_1.__decorate)([
    (0, context_1.globalInterceptor)('', { tags: { name: 'authorize' } }),
    (0, tslib_1.__param)(0, (0, context_1.inject)(authentication_1.AuthenticationBindings.METADATA)),
    (0, tslib_1.__param)(1, context_1.inject.getter(authentication_1.AuthenticationBindings.CURRENT_USER)),
    (0, tslib_1.__metadata)("design:paramtypes", [Array, Function])
], AuthorizeInterceptor);
exports.AuthorizeInterceptor = AuthorizeInterceptor;
//# sourceMappingURL=authorize.interceptor.js.map