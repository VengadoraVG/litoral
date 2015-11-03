var util = (function () {
  return {
    expand : function (instance, interfaces) {
      for (i of interfaces) {
        i.initialize(instance);
      }
    },
    inheritFunctions : function (instance, functions) {
      var x,
          prop;

      for (x in functions) {
        prop = functions[x];
        if (typeof(prop) === 'function') {
          instance[x] = prop;
        }
      }

      return instance;
    },
    inheritProperties : function (instance, functions) {
      var x,
          prop;

      for (x in functions) {
        prop = functions[x];
        if (typeof(prop) !== 'function') {
          instance[x] = prop;
        }
      }

      return instance;
    },
    execute : function (functions, context) {
      if (functions) {
        for (var f of functions) {
          f.call(context);
        }
      }
    },
    safePlay : function (sprite, animation) {
      if (sprite.animations.currentAnim !== animation) {
        sprite.animations.play(animation);
      }
    }
  };
})();
