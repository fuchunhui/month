// const target = {
//   foo: "bar"
// };

// const handler = {
//   get(trapTarget, property, receiver) {
//     return Reflect.get(...arguments);
//   }
// };

// const proxy = new Proxy(target, handler);
// console.log(proxy.foo); // bar
// console.log(target.foo); // bar


const target = {
  foo: "bar"
};

const handler = {
  get() {
    return 'intercepted'
  }
};

const {proxy, revoke} = Proxy.revocable(target, handler);
console.log(proxy.foo);
console.log(target.foo);

revoke();;
console.log(proxy.foo);

const o = {};
try {
  Object.defineProperty(o, 'foo', 'bar');
  console.log('success');
} catch (e) {
  console.log('failure');
}