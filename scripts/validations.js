const validations = function () {
    return { 
      nameRagex : function (name) {
        return name.match(/^[a-zA-Z0-9 _'!-]{2,}$/);
      }, 
  
      imageUrlRegex: function (url) {
        let urlRegex = /^((http[s]?|ftp):\/)?\/?([^:\/\s]+)((\/\w+)*\/)([\w\-\.]+[^#?\s]+)(.*)?(#[\w\-]+)?$/;
        return url.match (urlRegex);
      }, 
  
      mp3Regex: function (url) {
        return url.match (/^.+\.(([mM][pP][3]))$/);
      },
  
    };
  
  }();