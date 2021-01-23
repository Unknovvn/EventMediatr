"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const events_1 = require("events");
class EventMediatr {
    constructor(maxListenersCount) {
        /**
         * Method to publish request to mediatr
         * @param {object} request request object (command/query)
         * @returns anything that request handler handle method returns
         */
        this.publish = (request) => __awaiter(this, void 0, void 0, function* () {
            if (typeof request !== "object" || request.constructor === undefined) {
                throw new Error("Request should have a constructor");
            }
            const requestName = request.constructor.name;
            if (!this.eventIsListened(requestName)) {
                throw new Error(`There is no handler registered for request: ${requestName}`);
            }
            return yield new Promise((resolve) => {
                this.emitter.emit(requestName, request, (result) => resolve(result));
            });
        });
        /**
         * Method to publish request to mediatr
         * @param {string} requestName request name
         * @param {object} request request object (command/query)
         * @returns anything that request handler handle method returns
         */
        this.publishByName = (requestName, request) => __awaiter(this, void 0, void 0, function* () {
            if (!this.eventIsListened(requestName)) {
                throw new Error(`There is no handler registered for request: ${requestName}`);
            }
            return yield new Promise((resolve) => {
                this.emitter.emit(requestName, request, (result) => resolve(result));
            });
        });
        /**
         * method to register handlers with asynchronous handle method
         * @param {string} requestName request name to map request publishing with correct handler
         * @param {object} handler handler object with handle method
         */
        this.registerHandler = (requestName, handler) => {
            this.emitter.on(requestName, (request, callback) => __awaiter(this, void 0, void 0, function* () {
                const result = yield handler.handle(request);
                callback(result);
            }));
        };
        /**
         * method to register handlers with synchronous handle method
         * @param {string} requestName request name to map request publishing with correct handler
         * @param {object} handler handler object with handle method
         */
        this.registerSyncHandler = (requestName, handler) => {
            this.emitter.on(requestName, (request, callback) => {
                const result = handler.handle(request);
                callback(result);
            });
        };
        this.emitter = new events_1.EventEmitter();
        this.emitter.setMaxListeners(maxListenersCount ? maxListenersCount : 0);
    }
    eventIsListened(requestName) {
        const eventNames = this.emitter.eventNames();
        return eventNames.includes(requestName);
    }
}
exports.default = EventMediatr;
