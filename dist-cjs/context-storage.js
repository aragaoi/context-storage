"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContextStorage = void 0;
const node_async_hooks_1 = require("node:async_hooks");
class ContextStorage {
    asyncLocalStorage = new node_async_hooks_1.AsyncLocalStorage();
    contextFactory;
    contextName;
    constructor(contextFactory, contextName = "ContextStorage") {
        this.contextFactory = contextFactory;
        this.contextName = contextName;
    }
    runWithContext(callback, initialContext) {
        const context = initialContext ?? this.contextFactory();
        return this.asyncLocalStorage.run(context, callback);
    }
    getContext() {
        return this.asyncLocalStorage.getStore() ?? null;
    }
    getContextOrThrow() {
        const context = this.asyncLocalStorage.getStore();
        if (!context) {
            throw new Error(`${this.contextName} not found. This usually means the context middleware was not properly applied.`);
        }
        return context;
    }
    updateContext(partial) {
        const context = this.asyncLocalStorage.getStore();
        if (!context) {
            throw new Error(`Cannot update context outside of a ${this.contextName.toLowerCase()}`);
        }
        Object.assign(context, partial);
    }
}
exports.ContextStorage = ContextStorage;
//# sourceMappingURL=context-storage.js.map