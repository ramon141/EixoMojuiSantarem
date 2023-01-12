import { AuthenticationMetadata } from '@loopback/authentication';
import { Getter, Interceptor, InvocationContext, InvocationResult, Provider, ValueOrPromise } from '@loopback/context';
import { MyUserProfile } from '../types';
/**
 * This class will be bound to the application as an `Interceptor` during
 * `boot`
 */
export declare class AuthorizeInterceptor implements Provider<Interceptor> {
    metadatas: AuthenticationMetadata[];
    getCurrentUser: Getter<MyUserProfile>;
    constructor(metadatas: AuthenticationMetadata[], getCurrentUser: Getter<MyUserProfile>);
    /**
     * This method is used by LoopBack context to produce an interceptor function
     * for the binding.
     *
     * @returns An interceptor function
     */
    value(): (invocationCtx: InvocationContext, next: () => any) => Promise<any>;
    /**
     * The logic to intercept an invocation
     * @param invocationCtx - Invocation context
     * @param next - A function to invoke next interceptor or the target method
     */
    intercept(invocationCtx: InvocationContext, next: () => ValueOrPromise<InvocationResult>): Promise<any>;
}
