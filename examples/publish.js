const EventMediatr = require("../lib/EventMediatr.js").default;

class AsyncHandler {
  constructor() {}

  handle = async (request) => {
    console.log("Async handle starting");
    return await new Promise((resolve) => {
      setTimeout(() => {
        console.log(request.value);
        console.log("Async handle finished");
        resolve();
      }, 2000);
    });
  };
}

class AsyncRequest {
  value;

  constructor() {
    this.value = 1;
  }
}

var asyncRequest = new AsyncRequest();

const eventMediatr = new EventMediatr();
eventMediatr.registerHandler("AsyncRequest", new AsyncHandler());
eventMediatr.publish(asyncRequest);
