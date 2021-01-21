export default interface IHandler<TRequest, TResponse> {
    handle: (request: TRequest) => TResponse;
}
