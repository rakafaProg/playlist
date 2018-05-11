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

  // let currentPlaylists = [];


  // inputs.playlistImg.change(e=>{
  //   if (validations.imageUrlRegex(inputs.playlistImg.val())){
  //     $("#playlistTempImage").attr("src",inputs.playlistImg.val());
  //     inputs.playlistImg.removeClass("invalid-input");
  //   } else {
  //     inputs.playlistImg.addClass("invalid-input");
  //   }
  // });



  // open create playlist modal
  $(".addplaylist").click(e => {
    $("#gridSystemModalLabel").text("Add Playlist");
    $("#addplaylistform input").val("");
    $("#playlistTempImage").attr("src","");
    $("#addplaylistform input[name=songid]").val("-1");
    $('#addplaylistmodal').modal('show');
  });

  $(".modal button[name=next]").click(e=>{
    return;
    $("#songsform").html("");
    if ($("#addplaylistform input[name=songid]").val()!="-1")
      editSongListToHMTL($("#addplaylistform input[name=songid]").val());
    else {
      console.log("now song");
      $("#songsform").html(`<div data-id="1">${$("#repeatableSongInputs").html()}</div>`);
    }
    $('#addplaylistmodal').modal('hide');



    $("#editsongsmodal").modal("show");
    $("#editsongsmodal .modal-title").text($("#gridSystemModalLabel").text() + "'s Songs");
  });

  $(".modal button[name=addsong]").click(e=>{
    $("#songsform").append(`<div data-id="">${$("#repeatableSongInputs").html()}</div>`);
  });



  $("button[name=reset]").click(e=>{
    $("#addplaylistform input").val("");
    $("#playlistTempImage").attr("src","");

  });

  function getPlaylistHTML(playlist) {
    return `
    <div class="playlist" data-id="${playlist.id}">

      <div class="name">${playlist.name}</div>

      <div class="image-cropper">
        <img class="playlist-image" src="${playlist.image}" alt="${playlist.name}">
        <i class="glyphicon glyphicon-trash" data-id="${playlist.id}"></i>
        <i class="glyphicon glyphicon-edit editplaylist" data-id="${playlist.id}"></i>
        <i class="glyphicon glyphicon-play" data-id="${playlist.id}"></i>
      </div>

    </div>
    `;
  }

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

  function viewPlaylists (playlists) {
    $.each(playlists, function( index, playlist ) {
      $('main').append(getPlaylistHTML(playlist));
      currentPlaylists[playlist.id] = playlist;
    });

    // atach events
    $(".editplaylist").click(function(){
      $("#gridSystemModalLabel").text("Edit Playlist");

      let ind = $(this).data("id");
      $("#addplaylistform input[name=songid]").val(ind);
      $("#playlistTempImage").attr("src",currentPlaylists[ind].image);
      $("#playlistname").val(currentPlaylists[ind].name);
      $("#playlistimage").val(currentPlaylists[ind].image);

      $('#addplaylistmodal').modal('show');
    });
  }


  // getData ("", data => {
  //   viewPlaylists(data);

  //    $('.playlist .name')
  //    .each(function(){
  //       new CircleType(this).radius(120);
  //       $(this).fitText();
  //    });

  // });

  function getData (id, callback) {
    $.ajax({ // To get Data
      type: "GET",
      url: "api/playlist" + (id ? "/" + id : "" ),
      success: (result, status, xhr)=>{
        callback(result.data);
      }
    });
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
