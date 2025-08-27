import { ContextStorage } from "./context-storage";
export type UUID = string;
export type BaseRequestContext = {
    requestId: UUID;
    startedAt: string;
    startedAtTimestamp: number;
};
export type RequestContext<T = {}> = BaseRequestContext & T;
export declare const createRequestContext: <T = {}>(additionalFields?: T) => RequestContext<T>;
export declare class RequestContextStorage<T = {}> extends ContextStorage<RequestContext<T>> {
    constructor(name?: string, customContextFactory?: (initialContext?: RequestContext<T>) => RequestContext<T>);
}
//# sourceMappingURL=request-context.d.ts.map