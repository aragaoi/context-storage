export declare class ContextStorage<TContext> {
    private asyncLocalStorage;
    private contextFactory;
    private contextName;
    constructor(contextFactory: (initialContext?: TContext) => TContext, contextName?: string);
    runWithContext<T>(callback: () => T): T;
    runWithContext<T>(callback: () => T, initialContext: TContext): T;
    getContext(): TContext | null;
    getContextOrThrow(): TContext;
    updateContext(partial: Partial<TContext>): void;
}
//# sourceMappingURL=context-storage.d.ts.map