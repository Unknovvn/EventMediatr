export default interface IHandler<TRequest, TResponse> {
    handle: (request: TRequest) => Promise<TResponse>;
}
