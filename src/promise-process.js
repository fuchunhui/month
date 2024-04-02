class TrackablePromise extends Promise {
  constructor(executor) {
    const notifyHandlers = [];
    super((resolve, reject) => {
      return executor(
        resolve,
        reject,
        (status) => {
          notifyHandlers.map((handler) => handler(status));
        }
      );
    });
    this.notifyHandlers = notifyHandlers;
  }

  notify(handler) {
    this.notifyHandlers.push(handler);
    return this;
  }
}

let p = new TrackablePromise((resolve, reject, notify) => {
  function countdown(x) {
    if (x > 0) {
      notify(`${20 * x}% remaining`);
      setTimeout(() => countdown(x - 1), 1000);
    } else {
      resolve();
    }
  }
  countdown(5);
});

p.notify((x) => setTimeout(console.log, 0, 'process:', x));
p.then(() => setTimeout(console.log, 0, 'done'));
// Output:
// process: 100% remaining