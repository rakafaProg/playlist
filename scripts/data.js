

  var data = function () {
    var apiUrl = "api/playlist";
    let playlistArray =[];

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
        
        postData("", playlistObj, data=> {
          playlistArray[data.id] = {id:data.id, name:pName,image:pImg};
          callback(data.id);
        });
        
        //callback(1); // plalist id
      },

      updatePlalist: function (id, name, image) {
        let playlistObj = {
          name: name,
          image: image,
        };
        postData("/" + id, playlistObj, ()=>{
          playlistArray[id] = {id:id, name:name,image:image};
        });
      },

      updateSongs: function (pId, songs, callback) {        
        postData(`/${pId}/songs`,{songs: songs},  callback);
      },

      deletePlaylist: function (id) {
        $.ajax({
          type: "DELETE",
          url: apiUrl + "/" + id,
          success: (result, status, xhr) => {
            playlistArray[id] = null;
          }
        });
      },

      playlistArray: playlistArray,

    };

  }();
