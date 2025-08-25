import {AsyncLocalStorage} from 'node:async_hooks';

export class ContextStorage<TContext> {
  private asyncLocalStorage = new AsyncLocalStorage<TContext>();
  private contextFactory: () => TContext;
  private contextName: string;

  constructor(contextFactory: () => TContext, contextName: string = 'ContextStorage') {
    this.contextFactory = contextFactory;
    this.contextName = contextName;
  }

  runWithContext<T>(callback: () => T): T {
    return this.asyncLocalStorage.run(this.contextFactory(), callback);
  }

  getContext(): TContext | null {
    return this.asyncLocalStorage.getStore() ?? null;
  }

  getContextOrThrow(): TContext {
    const context = this.asyncLocalStorage.getStore();
    if (!context) {
      throw new Error(
        `${this.contextName} not found. This usually means the context middleware was not properly applied.`
      );
    }
    return context;
  }

  updateContext(partial: Partial<TContext>): void {
    const context = this.asyncLocalStorage.getStore();
    if (!context) {
      throw new Error(
        `Cannot update context outside of a ${this.contextName.toLowerCase()}`
      );
    }
    Object.assign(context, partial);
  }
}


