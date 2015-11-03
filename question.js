var Question = (function () {

  var Instance = (function () {
    return {
      getLooted : function () {
        Marker.Instance.getLooted.call(this);

        this.level.qaMenu.questions.push(this);

        if (!this.level.qaMenu.getSelectedQuestion()) {
          this.level.qaMenu.select(0);
        }
      }
    };
  })();

  return {
    /**
     * Creates a question.
     * @param{string} text - the question asked in text.
     * @param{{x: int, y: int, levelName: string}} place -
     * the x, y coordinate of the marker, and the level where this question can
     * be looted.
     */
    create : function (text, place) {
      var question = Marker.create(text, place, 'question');
      util.inheritFunctions(question, Instance);

      Question.collection.push(question);
      return question;
    },
    update : function () {
      var i;
      for (i=0; i<this.collection.length; i++) {
        if (this.collection[i].canBeLooted()) {
          this.collection[i].getLooted();
        }
      }
    },
    collection : [],
    spawn : Marker.spawn
  };
})();
