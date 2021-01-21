import IHandler from "./IHandler";
import ISyncHandler from "./ISyncHandler";
export default class EventMediatr {
    private emitter;
    constructor();
    publish: <TRequest, TResponse>(requestName: string, request: TRequest) => Promise<TResponse>;
    registerHandler: <TRequest, TResponse>(requestName: string, handler: IHandler<TRequest, TResponse>) => void;
    registerSyncHandler: <TRequest, TResponse>(requestName: string, handler: ISyncHandler<TRequest, TResponse>) => void;
    private eventIsListened;
}
