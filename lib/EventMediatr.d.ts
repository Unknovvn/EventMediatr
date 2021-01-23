import IHandler from "./IHandler";
import ISyncHandler from "./ISyncHandler";
export default class EventMediatr {
    private emitter;
    constructor(maxListenersCount?: number);
    /**
     * Method to publish request to mediatr
     * @param {object} request request object (command/query)
     * @returns anything that request handler handle method returns
     */
    publish: <TResponse>(request: object) => Promise<TResponse>;
    /**
     * Method to publish request to mediatr
     * @param {string} requestName request name
     * @param {object} request request object (command/query)
     * @returns anything that request handler handle method returns
     */
    publishByName: <TResponse>(requestName: string, request: object) => Promise<TResponse>;
    /**
     * method to register handlers with asynchronous handle method
     * @param {string} requestName request name to map request publishing with correct handler
     * @param {object} handler handler object with handle method
     */
    registerHandler: <TRequest, TResponse>(requestName: string, handler: IHandler<TRequest, TResponse>) => void;
    /**
     * method to register handlers with synchronous handle method
     * @param {string} requestName request name to map request publishing with correct handler
     * @param {object} handler handler object with handle method
     */
    registerSyncHandler: <TRequest, TResponse>(requestName: string, handler: ISyncHandler<TRequest, TResponse>) => void;
    private eventIsListened;
}
