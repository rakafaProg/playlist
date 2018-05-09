

  var data = function () {
    var apiUrl = "api/playlist";

    function getData (url, callback) {
      $.ajax({ 
        type: "GET",
        url: apiUrl + url,
        success: (result, status, xhr) => {
          callback(result.data);
        }
      });
    }

    function postData () {
      
    }

    return {
      getAllPlaylists: function (callback) {
        getData("", callback);
      },

      getSongs: function (playlistId) {
        getData(`/${playlistId}/songs`, callback);
      },

      createPlaylist: function (playlist) {
        return 1; // plalist id
      },

      updatePlalist: function (id, name, image) {

      },

      updateSongs: function (id, songs) {

      },

      deletePlaylist: function (id) {

      },

    };

  }();