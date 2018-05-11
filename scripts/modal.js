
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

        $("button[name=reset]").click(e=>{
            $("#addplaylistform input").val("");
            $("#playlistTempImage").attr("src","");
            $("#addplaylistform input").removeClass("invalid-input");
            $("#addplaylistError").hide();
        });

        $(".modal button[name=next]").click(e=>{
            if (!validations.nameRagex(inputs.playlistName.val()) || 
                !validations.imageUrlRegex(inputs.playlistImg.val())) {
                    $("#addplaylistError").show();
            } else {
                $("#addplaylistError").hide();

                if (inputs.playlistId.val()=="-1") {
                    alert("next");
                } else {
                    alert ("save and next");
                }
                
            }           
        });



    }


  
    return {
      addPlaylist : function () {
        viewAddModal("Add Playlist",-1, "", "");
      },
  
      editPlaylist : function (playlist) {
        viewAddModal("Edit Playlist",playlist.id, playlist.name, playlist.image);
      },
  
      editSongs : function (playlistId) {
  
        viewModal();
      },
  
      deletePlaylist : function (playlistId) {
  
        viewModal();
      },

      init: init
  
    }



  }();