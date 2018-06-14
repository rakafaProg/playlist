const player = function () {
    let audioPlayer; 

    function openPlayer (playlistId) {
        let playlist = data.playlistArr[playlistId];
        $("#player .image-cropper img").attr("src",playlist.image );
        $("#songsList .name").text(playlist.name);
        $("#player .editors i").data("id", playlistId);
    
        data.getSongs(playlistId, d => {
            setSongs(playlistId, d.songs);
            $("#player").show();
        });
    }
  
    function setSongs (pId, songs) {
        if (pId == $("#player .editors i").data("id")) {
            let tempHtml = "";
            $.each(songs, (index, song)=>{
                tempHtml += `<li data-url=${song.url}>${song.name}</li>`;
            });
            
            $("#songsList ol").html(tempHtml);
            $("#songsList ol li:first").addClass("current");
            $("#songsList ol li").click(songClick);
            changeAudio();
        }
    }
  
    function songClick() {
        if ($(this).hasClass("current")) {
            togglePlaying();
        } else {
            $(".current").removeClass("current");
            $(this).addClass("current");
            changeAudio();
        }
    }
  
    function changeAudio () {
        let url = $(".current").data("url");
        let title = $(".current").text() + " - " + $("#player .name").text();
    
        if (url) { // if there is a current song: 
            $(document).attr("title", title);
            $("#player audio").trigger("pause");
            $("#player source").attr("src", url);
            audioPlayer.pause();
            audioPlayer.load();
            audioPlayer.oncanplaythrough = audioPlayer.play();
    
            audioPlayer.onended = () => { // fpr the next one
                let nxt = $(".current").next();
                $(".current").removeClass("current");
                nxt.addClass("current");
                changeAudio();
            }
        }
    }
  
    function togglePlaying() {
        if ($("#pausePlayer").hasClass("glyphicon-play"))
            audioPlayer.play();
        else
            audioPlayer.pause();
    }

    function closePlayer () {
        audioPlayer.pause();
        $("#player").hide();
        $(document).attr("title", "Play Me");
    }
  
    function setEvents () {
      // side buttons: 
      // edit
      $("#player .editors .glyphicon-edit").click(function (e){
        let id = $(this).data("id");
        modals.editPlaylist(data.playlistArr[id]);
      });
      // delete 
      $("#player .editors .glyphicon-trash").click(function (e){
        let id = $(this).data("id");
        modals.deleteConfirmation(id);
      });
      // close player
      $("#player .editors .glyphicon-remove").click(closePlayer);
  
      // pause / play botten: 
      $("#pausePlayer").click(()=>togglePlaying());
  
      // song paused or played 
      audioPlayer.addEventListener("play",()=>{
        $("#player .image-cropper").addClass("playing");
        $("#player i.playerGlyph").addClass("glyphicon-pause").removeClass("glyphicon-play");
      });
      audioPlayer.addEventListener("pause",()=>{
        $("#player .image-cropper").removeClass("playing");
        $("#player i.playerGlyph").addClass("glyphicon-play").removeClass("glyphicon-pause");
      });
    }
  
    function init () {
      audioPlayer = $("#player audio")[0];
      setEvents();
    }
  
    return {
      init : init,
      setSongs : setSongs,
      openPlayer : openPlayer, 
      closePlayer : closePlayer,
      updatePlaylist (playlist) {
        if ($("#player .editors i").data("id") == playlist.id) {
            $("#player .image-cropper img").attr("src",playlist.image);
            $("#player .name").text(playlist.name);
          }
      }
    }
  } ();