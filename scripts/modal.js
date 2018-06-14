const modals = function () {
  let inputs; 

  function viewAddModal (header,pId, pName, pImage) {
    setAddModalAtrr(pName, pImage);
    inputs.playlistId.val(pId);
    $("#addplaylistHeader").text(header);
    $("#addplaylistmodal").modal("show");
  }

  function setAddModalAtrr (pName, pImage) {
    inputs.playlistName.val(pName).removeClass("invalid-input");
    inputs.playlistImg.val(pImage).removeClass("invalid-input");
    inputs.imagePreview.attr("src", pImage);
    $("#addplaylistError").hide();
  }

  // save playlist and next
  function savePlaylist () {
    if (!validations.nameRagex(inputs.playlistName.val()) ||
      !validations.imageUrlRegex(inputs.playlistImg.val())) {
      $("#addplaylistError").show();
    } else {
      $("#addplaylistError").hide();

      if (inputs.playlistId.val() != -1) {
        // update data in all layers
        let tempPlaylist = {id: inputs.playlistId.val(), name: inputs.playlistName.val(), image: inputs.playlistImg.val()}
        data.updatePlaylist(tempPlaylist);
        pView.updatePlaylist(tempPlaylist);
        player.updatePlaylist(tempPlaylist);
      }
      // go next
      viewSongsModal(inputs.playlistId.val());
    }
  }

  function viewSongsModal (playlistId) {
    $("#addplaylistmodal").modal("hide");

    $("#songsform").html("");
    if (playlistId != -1) {
      data.getSongs(playlistId, d=>{
        $.each(d.songs, (i,song)=>{
          addSongToModal(song);
        });
      });
    } else {
      addSongToModal({name:"",url:""});
    }

    $("#editsongsmodal").modal("show");
  }

  function addSongToModal (song) {
    let containerDiv = $("<div></div").addClass("songInputContainer");
    let nameInput = $("<div></div>").addClass("form-group col-xs-5");
    $("<input />").addClass("form-control")
      .attr("name", "songname").attr("placeholder", "Song's Name...")
      .val(song.name)
      .change(function() {validate(this,validations.nameRagex)})
      .appendTo(nameInput);

    let urlInput = $("<div></div>").addClass("form-group col-xs-6");
    $("<input />").addClass("form-control")
      .attr("name", "songurl").attr("placeholder", "Song Url...")
      .val(song.url)
      .change(function() {validate(this,validations.mp3Regex)})
      .appendTo(urlInput);

    nameInput.appendTo(containerDiv);
    urlInput.appendTo(containerDiv);
    containerDiv.appendTo("#songsform");
  }

  function saveSongs () {
    let songsArray = [];

    let valid = true;
    let names = $("input[name=songurl]");
    // create songs array: 
    $("input[name=songname]").each( function(i) {
      let songName = $(this).val();
      let songUrl = $(names[i]).val();

      if (validations.nameRagex(songName)
        && validations.mp3Regex(songUrl)
      ) {
        songsArray.push( {name: songName, url: songUrl});
      } else {
        valid = false;
      }
    });

    if (valid) {
      let pId = inputs.playlistId.val();
      if (pId == -1) { // create brand new playlist
        data.createPlaylist(inputs.playlistName.val(), inputs.playlistImg.val(), songsArray, newId => {
          pId = newId;
          pView.addPlaylist({id: pId, name: inputs.playlistName.val(), image:inputs.playlistImg.val() });
        });
      } else {
        // only update songs
        data.updateSongs(pId, songsArray, 
          () => player.setSongs(pId, songsArray));
      }
      $("#editsongsmodal").modal("hide");
    }

  }

  // Input validation: 
  function validate (inputElement, callback) {
    if (!callback ($(inputElement).val())) {
      $(inputElement).addClass("invalid-input");
      return false;
    } else {
      $(inputElement).removeClass("invalid-input");
      return true;
    }
  }

  function onDeleteConfirmed () {
    let id = $("#deleteId").val();

    data.deletePlaylist(id);
    $(`.playlist[data-id=${id}]`).remove();
    
    if ($("#player .editors i").data("id") == id) {
      player.closePlayer();
    }
    $("#deleteModal").modal("hide");
  }

  function init() {
    inputs = {
      playlistId: $("#addplaylistform input[name=songid]"),
      playlistName : $("#playlistname"),
      playlistImg : $("#playlistimage"),
      imagePreview: $("#playlistTempImage"),
    };

    inputs.playlistImg.change(function() {
      $("#addplaylistError").hide();
      if (validate(this,validations.imageUrlRegex)) 
        inputs.imagePreview.attr("src", $(this).val());
      else
        inputs.imagePreview.attr("src", "");
    });

    inputs.playlistName.change(function() {
      $("#addplaylistError").hide();
      validate(this,validations.nameRagex);
    });

    // Modal's events: 
    $("button[name=reset]").click(()=>setAddModalAtrr("",""));
    $(".modal button[name=next]").click(savePlaylist);
    $(".modal button[name=addsong]").click(()=>addSongToModal({name: "", url: ""}));
    $("#editsongsmodal button[name=save]").click(saveSongs);
    $(".modal button[name=delyes]").click(onDeleteConfirmed);
  }

  return {
    init : init ,

    editPlaylist : (playlist)=>viewAddModal("Edit Playlist", playlist.id, playlist.name, playlist.image),

    addPlaylist :  () => viewAddModal("Add Playlist",-1, "", ""),

    deleteConfirmation : function (playlistId) {
      $("#deleteId").val(playlistId);
      $("#deleteModal").modal("show");
    },

  }

} ();
