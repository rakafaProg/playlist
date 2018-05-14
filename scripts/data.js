

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

    function postData (url, data, callback) {
        console.log("trying to post data");
        $.ajax({
        type: "POST",
        url: apiUrl + url,
        data: data,
        success: (result, status, xhr) => {
          callback(result.data);
        }
      });
    }

    return {
      getAllPlaylists: function (callback) {
        getData("", callback);
      },

      getSongs: function (playlistId, callback) {
        getData(`/${playlistId}/songs`, callback);
      },

      createPlaylist: function (pName, pImg, songs, callback) {
        let playlistObj = {
          name: pName,
          image: pImg,
          songs: songs
        };
        console.log("i want to post this playlist for u");
        postData("", playlistObj, data=>callback(data.id));
        //callback(1); // plalist id
      },

      updatePlalist: function (id, name, image) {

      },

      updateSongs: function (pId, songs, callback) {
        callback();
      },

      deletePlaylist: function (id) {

      },

    };

  }();
