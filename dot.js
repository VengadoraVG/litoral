var X = 0,
    Y = 1;

var dot = (function () {
  var size = function (v) {
    return Math.sqrt(Math.pow(v[X],2) + Math.pow(v[Y],2));
  };

  var mul = function (v, scalar) {
    var product = [];
    product[X] = v[X] * scalar;
    product[Y] = v[Y] * scalar;

    return product;
  };

  var unitVector = function (v) {
    var m = size(v);

    if (m === 0) {
      return [0,0];
    }

    return dot.mul(v, 1/m);
  };

  return {
    size : size,
    unitVector : unitVector,
    mul : mul
  };
})();
