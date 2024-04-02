function factorial(n) {
  if (n <= 1) {
    return 1;
  }
  return n * factorial(n - 1);
}

function trueFactorial(num) {
  if (num <= 1) {
    return 1;
  }
  return num * arguments.callee(num - 1);
}

factorial(5);
trueFactorial(5);