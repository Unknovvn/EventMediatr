import { EventEmitter } from "events";

class EventMediatr {
  #emitter;

  /**
   * constructor of EventMediatr
   */
  constructor() {
    this.#emitter = new EventEmitter();
  }

  /**
   * Method to publish request to mediatr
   * @param {string} requestName
   * @param {object} request
   * @returns anything that request handler handle method returns
   */
  publish = async (requestName, request) => {
    if (!this.#eventIsListened(requestName)) {
      throw new Error(
        `There is no handler registered for request: ${requestName}`
      );
    }

    return await new Promise((resolve) => {
      this.#emitter.emit(requestName, request, (result) => resolve(result));
    });
  };

  /**
   * method to register handlers with async handle method
   * @param {string} requestName request name to map request publishing with correct handler
   * @param {object} handler handler object with handle method
   */
  registerHandler = (requestName, handler) => {
    this.#emitter.on(requestName, async (request, callback) => {
      var result = await handler.handle(request);
      callback(result);
    });
  };

  /**
   * method to register handlers with sync handle method
   * @param {string} requestName request name to map request publishing with correct handler
   * @param {object} handler handler object with handle method
   */
  registerSyncHandler = (requestName, handler) => {
    this.#emitter.on(requestName, (request, callback) => {
      var result = handler.handle(request);
      callback(result);
    });
  };

  #eventIsListened(requestType) {
    const eventNames = this.#emitter.eventNames();
    return eventNames.includes(requestType);
  }
}

export default EventMediatr;
