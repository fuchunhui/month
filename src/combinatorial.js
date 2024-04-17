// 使用原型链继承原型上的属性和方法，而通过盗用构造函数继承实例属性。这样，既可以把方法定义在原型上以实现方法的共享，又可以让每个实例都有自己的属性。

function SuperType(name) {
  this.name = name;
  this.colors = ['red', 'blue', 'green'];
}
SuperType.prototype.sayName = function() {
  console.log(this.name);
}

function SubType(name, age) {
  // inherit properties
  SuperType.call(this, name);
  this.age = age;
}

// inherit methods
SubType.prototype = new SuperType();
SubType.prototype.sayAge = function() {
  console.log(this.age);
}

let instance1 = new SubType('Nicholas', 29);
instance1.colors.push('black');
console.log(instance1.colors); // ['red', 'blue', 'green', 'black']
instance1.sayName(); // Nicholas
instance1.sayAge(); // 29

let instance2 = new SubType('Greg', 27);
console.log(instance2.colors); // ['red', 'blue', 'green']
instance2.sayName(); // Greg
instance2.sayAge(); // 27

// 组合继承弥补了原型链和盗用构造函数的不足，成为 JavaScript 中最常用的继承模式。
// 而且组合继承也保留了 instanceof 操作符和 isPrototypeOf() 方法识别合成对象的能力。
