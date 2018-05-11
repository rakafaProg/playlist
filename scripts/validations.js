var validations = function () {

    return {
      nameRagex : function (name) {
        return name.length >= 2;
      }, 

      imageUrlRegex: function (url) {
        return true;
      }, 

      mp3Regex: function (url) {
        return true;
      },

      audioAjax: function (url) {
        return true;
      },

    };

}();