"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MySequence = void 0;
const tslib_1 = require("tslib");
const authentication_1 = require("@loopback/authentication");
const context_1 = require("@loopback/context");
const rest_1 = require("@loopback/rest");
const SequenceActions = rest_1.RestBindings.SequenceActions;
let MySequence = class MySequence {
    constructor(findRoute, parseParams, invoke, send, reject, authenticateRequest) {
        this.findRoute = findRoute;
        this.parseParams = parseParams;
        this.invoke = invoke;
        this.send = send;
        this.reject = reject;
        this.authenticateRequest = authenticateRequest;
        /**
         * Optional invoker for registered middleware in a chain.
         * To be injected via SequenceActions.INVOKE_MIDDLEWARE.
         */
        this.invokeMiddleware = () => false;
    }
    async handle(context) {
        try {
            const { request, response } = context;
            const finished = await this.invokeMiddleware(context);
            if (finished)
                return;
            const route = this.findRoute(request);
            // call authentication action
            await this.authenticateRequest(request);
            const args = await this.parseParams(request, route);
            const result = await this.invoke(route, args);
            this.send(response, result);
        }
        catch (err) {
            this.reject(context, err);
        }
    }
};
(0, tslib_1.__decorate)([
    (0, context_1.inject)(SequenceActions.INVOKE_MIDDLEWARE, { optional: true }),
    (0, tslib_1.__metadata)("design:type", Function)
], MySequence.prototype, "invokeMiddleware", void 0);
MySequence = (0, tslib_1.__decorate)([
    (0, tslib_1.__param)(0, (0, context_1.inject)(SequenceActions.FIND_ROUTE)),
    (0, tslib_1.__param)(1, (0, context_1.inject)(SequenceActions.PARSE_PARAMS)),
    (0, tslib_1.__param)(2, (0, context_1.inject)(SequenceActions.INVOKE_METHOD)),
    (0, tslib_1.__param)(3, (0, context_1.inject)(SequenceActions.SEND)),
    (0, tslib_1.__param)(4, (0, context_1.inject)(SequenceActions.REJECT)),
    (0, tslib_1.__param)(5, (0, context_1.inject)(authentication_1.AuthenticationBindings.AUTH_ACTION)),
    (0, tslib_1.__metadata)("design:paramtypes", [Function, Function, Function, Function, Function, Function])
], MySequence);
exports.MySequence = MySequence;
//# sourceMappingURL=sequence.js.map