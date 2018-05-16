
  var modalControl = function () {

    let inputs;

    // View Modal
    function viewAddModal(header,pId, pName, pImage) {
        $("#addplaylistmodal input").removeClass("invalid-input");
        $("#addplaylistError").hide();
        $("#addplaylistHeader").text(header);
        inputs.playlistId.val(pId);
        inputs.playlistName.val(pName);
        inputs.playlistImg.val(pImage);
        inputs.imagePreview.attr("src", pImage);
        $("#addplaylistmodal").modal("show");
    }

    function editSongs (playlistId) {
        $("#addplaylistmodal").modal("hide");

        $("#songsform").html("");
        if (playlistId != -1) {
          data.getSongs(playlistId, d=>{
            $.each(d.songs, (i,song)=>{
              addSongToView(song);
            });
          });
        } else {
          addSongToView({name:"",url:""});
        }

        $("#editsongsmodal").modal("show");
    }



    function addSongToView (song) {
      let containerDiv = $("<div></div").addClass("songInputContainer");
      let nameInput = $("<div></div>").addClass("form-group col-xs-5");
      $("<input />").addClass("form-control")
      .attr("name", "songname").attr("placeholder", "Song's Name...")
      .val(song.name)
      .change(songNameChanged)
      .appendTo(nameInput);

      let urlInput = $("<div></div>").addClass("form-group col-xs-6");
      $("<input />").addClass("form-control")
      .attr("name", "songurl").attr("placeholder", "Song Url...")
      .val(song.url)
      .change(songUrlChanged)
      .appendTo(urlInput);

      nameInput.appendTo(containerDiv);
      urlInput.appendTo(containerDiv);

      containerDiv.appendTo("#songsform");
    }

    function songNameChanged(e) {
      if (!validations.nameRagex($(this).val())) {
        $(this).addClass("invalid-input");
      } else {
        $(this).removeClass("invalid-input");
      }
    }

    function songUrlChanged(e) {
      console.log("url chnaged");
    }

    function init () {
        // Modal Inputs
        inputs = {
            playlistId: $("#addplaylistform input[name=songid]"),
            playlistName : $("#playlistname"),
            playlistImg : $("#playlistimage"),
            imagePreview: $("#playlistTempImage"),
        };


        // Modal Events
        inputs.playlistImg.change(e=>{
            $("#addplaylistError").hide();
            if(validations.imageUrlRegex(inputs.playlistImg.val())) {
                inputs.imagePreview.attr("src", inputs.playlistImg.val());
                inputs.playlistImg.removeClass("invalid-input");
            } else {
                inputs.imagePreview.attr("src", "");
                inputs.playlistImg.addClass("invalid-input");
            }
        });

        inputs.playlistName.change(e=>{
            $("#addplaylistError").hide();
            if(validations.nameRagex(inputs.playlistName.val())) {
                inputs.playlistName.removeClass("invalid-input");
            } else {
                inputs.playlistName.addClass("invalid-input");
            }
        });

        // Reset Inputs
        $("button[name=reset]").click(e=>{
            inputs.imagePreview.attr("src","");
            $("#addplaylistform input").val("");
            $("#addplaylistform input").removeClass("invalid-input");
            $("#addplaylistError").hide();
        });

        // Go to Songs Editing
        $(".modal button[name=next]").click(e=>{
            if (!validations.nameRagex(inputs.playlistName.val()) ||
                !validations.imageUrlRegex(inputs.playlistImg.val())) {
                    $("#addplaylistError").show();
            } else {
                $("#addplaylistError").hide();

                if (inputs.playlistId.val()!="-1") {
                    data.updatePlalist(inputs.playlistId.val(), inputs.playlistName.val(), inputs.playlistImg.val());
                    viewControl.updatePlaylist(inputs.playlistId.val(), inputs.playlistName.val(), inputs.playlistImg.val());
                }

                editSongs (inputs.playlistId.val());

            }
        });

        // delete event
        $(".modal button[name=delyes]").click(e=>{
          let id = $("#deleteId").val();
          data.deletePlaylist(id);
          $(`.playlist[data-id=${id}]`).remove();
          $("#deleteModal").modal("hide");
        });

        $(".modal button[name=addsong]").click(addSongToView);

        $("#editsongsmodal button[name=save]").click(e=> {
          let songsArray = [];

          let names = $("input[name=songurl]")
          let valid = true;

          $("input[name=songname]").each((i, value)=>{
            let songName = $(value).val();
            let songUrl = $(names[i]).val();
            if (validations.nameRagex(songName)
              && validations.mp3Regex(songUrl)
              && validations.audioAjax(songUrl)
            ) {
              songsArray.push( {name: songName, url: songUrl});
            } else {
              valid = false;
            }


          });

          if (valid) { // save songs
            if(inputs.playlistId.val()==-1) {
              data.createPlaylist(inputs.playlistName.val(), inputs.playlistImg.val(), songsArray, pId => {

                viewControl.addPlaylist({
                  id:pId,
                  name: inputs.playlistName.val(),
                  image: inputs.playlistImg.val()
                });

              });

            } else {
              data.updateSongs(inputs.playlistId.val(), songsArray, () => {
                console.log("Saved Songs!!");
              });
            }
            $("#editsongsmodal").modal("hide");
          }

          //console.log(songsArray);

        });

    }



    return {
      addPlaylist : function () {
        viewAddModal("Add Playlist",-1, "", "");
      },

      editPlaylist : function (playlist) {
        viewAddModal("Edit Playlist",playlist.id, playlist.name, playlist.image);
      },

    //   editSongs : function (playlistId) {

    //     viewModal();
    //   },

      deleteConfirmation : function (playlistId) {
        $("#deleteId").val(playlistId);
        $("#deleteModal").modal("show");
      },

      init: init

    }



  }();
