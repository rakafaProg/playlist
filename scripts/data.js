const data = function () {
    let apiUrl = "api/playlist";
    let playlistArr = [];
  
    function getData(url, callback) {
      $.ajax({
        type: "GET",
        url: apiUrl + url,
        success: (result) => {
          callback(result.data);
        }
      });
    }
  
    function postData(url, data, callback) {
      $.ajax({
        type: "POST",
        url: apiUrl + url,
        data: data,
        success: (result) => {
          callback(result.data);
        }
      });
    }
  
    function deleteData (pId) {
      $.ajax({
        type: "DELETE",
        url: apiUrl + "/" + pId,
        success: () => {
          playlistArr[pId] = undefined;
        }
      });
    }
  
    function createPlaylist (pName, pImage, pSongs, callback) {
      let playlistObj = {
        name: pName,
        image: pImage,
        songs: pSongs
      };
  
      postData ("", playlistObj, data => {
        playlistArr[data.id] = {id: data.id, name: pName, image: pImage};
        callback (data.id);
      });
  
    }
  
    function updatePlaylist (playlistObj) {  
      postData (`/${playlistObj.id}`, playlistObj, () => {
        playlistArr[playlistObj.id] = playlistObj;
      });
    }
  
    return {
      playlistArr : playlistArr,
      getAllPlaylists: (callback) => getData("", callback),
      getSongs: (pId, callback) => getData (`/${pId}/songs`, callback),
      createPlaylist : createPlaylist,
      updatePlaylist : updatePlaylist,
      updateSongs : (pId, songs, callback) => 
          postData(`/${pId}/songs`,{songs: songs},  callback),  
      deletePlaylist : deleteData,
    };
  
  }();