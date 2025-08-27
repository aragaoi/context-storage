import {randomUUID} from 'crypto';
import { ContextStorage } from "./context-storage";

export type UUID = string;

export type BaseRequestContext = {
  requestId: UUID;
  startedAt: string;
  startedAtTimestamp: number;
};

export type RequestContext<T = {}> = BaseRequestContext & T;

export const createRequestContext = <T = {}>(
  additionalFields?: T
): RequestContext<T> => {
  const now = new Date();
  const baseContext = {
    requestId: randomUUID(),
    startedAtTimestamp: now.getTime(),
    startedAt: now.toISOString(),
  };

  if (additionalFields) {
    return { ...baseContext, ...additionalFields };
  }

  return baseContext as RequestContext<T>;
};

export class RequestContextStorage<T = {}> extends ContextStorage<RequestContext<T>> {
  constructor(
    name?: string,
    customContextFactory?: (
      initialContext?: RequestContext<T>
    ) => RequestContext<T>
  ) {
    super(
      customContextFactory || createRequestContext,
      name || "Request context"
    );
  }
}
