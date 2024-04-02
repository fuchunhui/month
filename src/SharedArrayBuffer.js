const workerScript = `
  self.onmessage = ({data}) => {
    const view = new Uint32Array(data);

    for (let i = 0; i < 1E6; i++) {
      view[0] += 1;
    }
    self.postMessage(null);
  };
`;

const workScriptBlobUrl = URL.createObjectURL(new Blob([workerScript]));

const workers = [];
for (let i = 0; i < 4; i++) {
  workers.push(new Worker(workScriptBlobUrl));
}

let responseCount = 0;
for (const worker of workers) {
  worker.onmessage = () => {
    if (++responseCount === workers.length) {
      console.log('done');
    }
  };
}

const sharedArrayBuffer = new SharedArrayBuffer(4);
const view = new Uint32Array(sharedArrayBuffer);
view[0] = 1;

for (const worker of workers) {
  worker.postMessage(sharedArrayBuffer);
}

document.body.innerHTML = `
  <div>
    <p>Foo</p>
  </div>
`;

setTimeout(() => document.querySelector('div').attachShadow({mode: 'open'}).innerHTML = `<div id="bar"><slot></slot></div>`, 1000);