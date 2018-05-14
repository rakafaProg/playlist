(function () {
  "use strict";

  let playlistArray =[];




  function init () {

    // set event for view control:
    viewControl.setEvents({
      playPlaylist: function(e) {alert("play")},
      editPlaylist: editPlaylistClick,
      deletePlaylist: function(e) {alert("delete")},
    });

    // get all playlists from api
    data.getAllPlaylists (data => {
      $.each(data, function( index, playlist ) {
        viewControl.addPlaylist(playlist);
        playlistArray[playlist.id] = playlist;
      });
    });

    modalControl.init();

  }

  function editPlaylistClick (e) {
    let id = $(this).data("id");
    modalControl.editPlaylist(playlistArray[id]);
  }

  // open create playlist modal
  $(".addplaylist").click(e => {
    modalControl.addPlaylist();
  });




  function editSongListToHMTL(songid) {
    getData (songid + "/songs", data=>{
      $.each(data.songs, (ind, song)=>{
        $("#songsform").append(`<div data-id="${ind}">${$("#repeatableSongInputs").html()}</div>`);
        $(`#songsform div[data-id=${ind}] input[name=songurl]`).val(song.url);
        $(`#songsform div[data-id=${ind}] input[name=songname]`).val(song.name);
      });

      console.log(data);
    })
  }




  init();


})();











/*
  Missions:

  Add new playlist
    Validate name: letters, numbers, spaces. at list 2 letters.
    validate image url: regex for template

    Add songs :
      Validate name: letters, numbers, spaces. at list 2 letters.
      Validate song url:
        regex for template. must be .mp3 url.
        ajax for header content type - audio/mpeg.

    Save playlist and songs:
      Post data and get playlist id
      Add the new playlist to view.

  Edit existing playlist
    Validate name: letters, numbers, spaces. at list 2 letters.
    validate image url: regex for template
    Save data using ajax.
    Update view.

    Edit / add songs:
      Validate name: letters, numbers, spaces. at list 2 letters.
      Validate song url:
        regex for template. must be .mp3 url.
        ajax for header content type - audio/mpeg.
      Save data using ajax.


*/
