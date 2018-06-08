(function () {
  "use strict";

  




  function init () {

    // set event for view control:
    viewControl.setEvents({
      playPlaylist: function(e) {openPlayer($(this).data("id"))},
      editPlaylist: editPlaylistClick,
      deletePlaylist: function(e) {
        modalControl.deleteConfirmation($(this).data("id"));
      },
    });

    // get all playlists from api
    data.getAllPlaylists (playlists => {
      $.each(playlists, function( index, playlist ) {
        viewControl.addPlaylist(playlist);
        data.playlistArray[playlist.id] = playlist;
      });
    });

    modalControl.init();

    

  }

  function editPlaylistClick (e) {
    let id = $(this).data("id");
    modalControl.editPlaylist(data.playlistArray[id]);
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

  $("#pausePlayer").click(e=>togglePlaying());

  function togglePlaying() {
    if ($("#pausePlayer").hasClass("glyphicon-play"))
      $("#player audio")[0].play();
    else
      $("#player audio")[0].pause();
  }

  function openPlayer (playlistId) {
    data.getSongs(playlistId, d => {
      console.log(d);
      $("#songsList .name").text(data.playlistArray[playlistId].name);
      $("#player .image-cropper img").attr("src",data.playlistArray[playlistId].image );
      $("#songsList ol").html(songsHtml(d.songs));
      $("#songsList ol li:first").addClass("current");
      $("#player").show();
      changeAudio();
      $("#songsList li").click(e=>{
        if ($(e.target).hasClass("current")) {
          togglePlaying();
        } else {
          $(".current").removeClass("current");
          $(e.target).addClass("current");
          changeAudio();
          
        }
        
      });
    });
  }

  function songsHtml(songs) {
    let tempHtml = "";
    $.each(songs, (index, song)=>{
      tempHtml += `<li data-url=${song.url}>${song.name}</li>`;
    });
    return tempHtml;
  }

  function changeAudio() {
    
    let url = $(".current").data("url");
    let title = $(".current").text();
    
    
    if (url) {
      $(document).attr("title", title);
      var audio = $("#player audio");   
      audio.trigger("pause");   
      $("#player source").attr("src", url);
      /****************/
      audio[0].pause();//.catch(err=>console.log(err));
      
      audio[0].load();//.catch(err=>console.log(err));//suspends and restores all audio element
  
      //audio[0].play(); //changed based on Sprachprofi's comment below
      audio[0].oncanplaythrough = audio[0].play();//.catch(err=>console.error("player error"));
      /****************/
      audio[0].onended = ()=>{
        let nxt = $(".current").next();
        $(".current").removeClass("current");
        nxt.addClass("current");
        changeAudio();
      };
      
    } else {
      $("#player .image-cropper").removeClass("playing");
      $("#player i.playerGlyph").addClass("glyphicon-pause").removeClass("glyphicon-play");
    }
  }

  $("#player audio")[0].addEventListener("play",()=>{
    $("#player .image-cropper").addClass("playing");
    $("#player i.playerGlyph").addClass("glyphicon-pause").removeClass("glyphicon-play");
  });
  $("#player audio")[0].addEventListener("pause",()=>{
    $("#player .image-cropper").removeClass("playing");
    $("#player i.playerGlyph").addClass("glyphicon-play").removeClass("glyphicon-pause");
  });

  $("#player .editors .glyphicon-remove").click(()=>{
    $("#player audio")[0].pause();
    $("#player").hide();
    $(document).attr("title", "Play Me")
  }) ;


  



  init();


  function search (textToSearch) {
    let searchedArr = data.playlistArray.filter(playlist => playlist.name.includes(textToSearch));
    return searchedArr;
  }

  $("input[name=search]").keyup(e=>{
    let searchVal = $(e.target).val().toUpperCase();
    if (searchVal.length >= 2) {
      $("#playlists .playlist").each((index,value)=>{
        let id = $(value).data("id");
        if (data.playlistArray[id].name.toUpperCase().includes(searchVal)) {
          $(value).show();
        } else {
          $(value).hide();
        }
      });

    } else {
      $("#playlists .playlist").show();
    }
  });

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
