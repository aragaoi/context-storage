"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequestContextStorage = exports.createRequestContext = void 0;
const crypto_1 = require("crypto");
const context_storage_1 = require("./context-storage");
const createRequestContext = (additionalFields) => {
    const now = new Date();
    const baseContext = {
        requestId: (0, crypto_1.randomUUID)(),
        startedAtTimestamp: now.getTime(),
        startedAt: now.toISOString(),
    };
    if (additionalFields) {
        return { ...baseContext, ...additionalFields };
    }
    return baseContext;
};
exports.createRequestContext = createRequestContext;
class RequestContextStorage extends context_storage_1.ContextStorage {
    constructor(name, customContextFactory) {
        super(customContextFactory || exports.createRequestContext, name || "Request context");
    }
}
exports.RequestContextStorage = RequestContextStorage;
//# sourceMappingURL=request-context.js.map