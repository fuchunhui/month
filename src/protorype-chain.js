function SuperType() {
  this.property = true;
}

SuperType.prototype.getSuperValue = function() {
  return this.property;
}

function SubType() {
  this.subproperty = false;
}

// inherit from SuperType
SubType.prototype = new SuperType();
SubType.prototype.getSubValue = function() {
  return this.subproperty;
}

SubType.prototype.getSuperValue = function() {
  return false;
}

let instance = new SubType();
console.log(instance.getSuperValue()); // true