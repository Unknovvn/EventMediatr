import { EventEmitter } from "events";
import IHandler from "./IHandler";
import ISyncHandler from "./ISyncHandler";

export default class EventMediatr {
  private emitter: EventEmitter;

  constructor() {
    this.emitter = new EventEmitter();
  }

  publish = async <TRequest, TResponse>(
    requestName: string,
    request: TRequest
  ): Promise<TResponse> => {
    if (!this.eventIsListened(requestName)) {
      throw new Error(
        `There is no handler registered for request: ${requestName}`
      );
    }

    return await new Promise((resolve) => {
      this.emitter.emit(requestName, request, (result: TResponse) =>
        resolve(result)
      );
    });
  };

  registerHandler = <TRequest, TResponse>(
    requestName: string,
    handler: IHandler<TRequest, TResponse>
  ) => {
    this.emitter.on(
      requestName,
      async (request: TRequest, callback: (result: TResponse) => void) => {
        const result = await handler.handle(request);
        callback(result);
      }
    );
  };

  registerSyncHandler = <TRequest, TResponse>(
    requestName: string,
    handler: ISyncHandler<TRequest, TResponse>
  ) => {
    this.emitter.on(
      requestName,
      (request: TRequest, callback: (result: TResponse) => void) => {
        const result = handler.handle(request);
        callback(result);
      }
    );
  };

  private eventIsListened(requestName: string): boolean {
    const eventNames = this.emitter.eventNames();
    return eventNames.includes(requestName);
  }
}
