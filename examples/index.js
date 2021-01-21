import EventMediatr from "../lib/EventMediatr.js";

class AsyncHandler {
  constructor() {}

  handle = async () => {
    console.log("Async handle starting");
    return await new Promise((resolve) => {
      setTimeout(() => {
        console.log("Async handle finished");
        resolve();
      }, 2000);
    });
  };
}

class SyncHandler {
  constructor() {}

  handle = () => {
    console.log("Async handle starting");
    return setTimeout(() => {
      console.log("Sync handle finished");
    }, 2000);
  };
}

const eventMediatr = new EventMediatr();

const asyncHandler = new AsyncHandler();
const syncHandler = new SyncHandler();

eventMediatr.registerHandler("async", asyncHandler);
eventMediatr.registerSyncHandler("sync", syncHandler);

eventMediatr.publish("async", {});
eventMediatr.publish("sync", {});
