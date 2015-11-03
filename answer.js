var Answer = (function () {
  var Instance = (function () {
    return {
      canBeLooted : function () {
        return Marker.Instance.canBeLooted.call(this) &&
          this.level.qaMenu.getSelectedQuestion() === this.question;
      }
    }
  })();

  return {
    /**
     * Creates a question.
     * @param{string} text - the question asked in text.
     * @param{Question.create()} question - the question that 
     * answers this answer.
     * @param{{x: int, y: int, levelName: string}} place -
     * the x, y coordinate of the marker, and the level where this answer can
     * be looted.
     */
    create : function (text, place, question) {
      var answer = Marker.create(text, place, 'answer');
      util.inheritFunctions(answer, Instance);
      answer.question = question;
      this.collection.push(answer);

      return answer;
    },
    initialize : function (lvl) {
      this.lootAnswerKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
      this.lootAnswerKey.onDown.add(this.checkLoot, this);
    },
    checkLoot : function () {
      var i = this.collection.length,
          answer;
      while (i--) {
        answer = this.collection[i];
        if (answer.canBeLooted()) {
          answer.getLooted();
          answer.level.qaMenu.removeSelected();
        } else {
          console.log('nope');
        }
      }
    },
    spawn : Marker.spawn,
    collection : []
  };
})();

(function () {
  var i, q, a;

  for (i=0; i<config.qa.length; i++) {
    q = config.qa[i].question;
    q = Question.create(q.text, q.place);

    a = config.qa[i].answer;
    a = Answer.create(a.text, a.place, q);
  }
})();

