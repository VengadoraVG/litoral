// menu for questions and answers
// must be created once for level
var QAMenu = (function () {
  var menuPosition = {
    x : 10,
    y : 10
  };

  var addSprite = function (x,y, key) {
    var sprite = game.add.sprite(menuPosition.x + x,
                                 menuPosition.y + y, key);
    sprite.fixedToCamera = true;
    zOrder.putInLayer(sprite, 'MENU');

    return sprite;
  };

  var addText = function (x,y) {
    var style = { font: '10px Sans', fill: '#000', align: 'center',
                  wordWrap: true},
        text = game.add.text(x, y, '', style);


    text.fixedToCamera = true;
    text.anchor.set(0.5,0);
    zOrder.putInLayer(text, 'MENU');

    return text;
  };

  var Instance = (function () {
    return {
      update : function () {
        if (this.getSelectedQuestion()) {
          this.selected.text.text = this.getSelectedQuestion().text;
        } else {
          this.selected.text.text = '';
        }
      },

      getSelectedQuestion : function () {
        return this.questions[this.selected.questionIndex];
      },

      select : function (index) {
        this.selected.questionIndex = index;
      },

      next : function () {
        console.log('next!');
        this.selected.questionIndex = Math.min(this.selected.questionIndex+1,
                                               this.questions.length-1);
      },

      previous : function () {
        console.log('previous!');
        this.selected.questionIndex = Math.max(0, this.selected.questionIndex-1);
      },

      removeSelected : function () {
        this.questions.splice(this.selected.questionIndex, 1);
        this.selected.questionIndex--;
      }
    };
  })();

  return {
    create : function (level) {
      var menu = {
        questions : []
      };
      menu.selected = {
        questionIndex : -1,
        frame : addSprite(0,0, 'selected-question-frame'),
        level : level,
      };
      menu.selected.text = addText(menu.selected.frame.width/2, 20);

      cursor = game.input.keyboard.createCursorKeys();
      cursor.nuevaTecla = game.input.keyboard.addKey(Phaser.Keyboard.A);

      menu.keys = {
        up : game.input.keyboard.addKey(Phaser.Keyboard.Q),
        down : game.input.keyboard.addKey(Phaser.Keyboard.A)
      };

      menu.keys.up.onDown.add(Instance.previous, menu);
      menu.keys.down.onDown.add(Instance.next, menu);

      util.inheritFunctions(menu, Instance);
      return menu;
    }
  };
})();
