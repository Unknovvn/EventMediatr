import { EventEmitter } from "events";
import IHandler from "./IHandler";
import ISyncHandler from "./ISyncHandler";

export default class EventMediatr {
  private emitter: EventEmitter;

  constructor(maxListenersCount?: number) {
    this.emitter = new EventEmitter();
    this.emitter.setMaxListeners(maxListenersCount ? maxListenersCount : 0);
  }

  /**
   * Method to publish request to mediatr
   * @param {object} request request object (command/query)
   * @returns anything that request handler handle method returns
   */
  publish = async <TResponse>(request: object): Promise<TResponse> => {
    if (typeof request !== "object" || request.constructor === undefined) {
      throw new Error("Request should have a constructor");
    }

    const requestName = request.constructor.name;
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

  /**
   * Method to publish request to mediatr
   * @param {string} requestName request name
   * @param {object} request request object (command/query)
   * @returns anything that request handler handle method returns
   */
  publishByName = async <TResponse>(
    requestName: string,
    request: object
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

  /**
   * method to register handlers with asynchronous handle method
   * @param {string} requestName request name to map request publishing with correct handler
   * @param {object} handler handler object with handle method
   */
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

  /**
   * method to register handlers with synchronous handle method
   * @param {string} requestName request name to map request publishing with correct handler
   * @param {object} handler handler object with handle method
   */
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
