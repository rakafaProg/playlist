
var viewControl = function () {
  
    let events = {};

    let playlistsContainer = "#playlists";

    function createElement (tag, classList, dataid) {
      return $(`<${tag}></${tag}>`)
              .addClass(classList)
              .data("id", dataid);
    }

    return {
      addPlaylist: function (playlist) {
        // playlist main div
        let maindiv = createElement("div", "playlist", playlist.id);

        // name 
        let nameDiv = createElement("div", "name", playlist.id).text(playlist.name);
        nameDiv.appendTo(maindiv);
        
        let imageContainer = createElement("div", "image-cropper", playlist.id);
        // playlist image
          $("<img />")
          .attr("src", playlist.image)
          .addClass("playlist-image")
          .appendTo(imageContainer);
        // delete button
          createElement("i", "glyphicon glyphicon-trash", playlist.id)
          .click (events.deletePlaylist)
          .appendTo(imageContainer);
        // edit button
          createElement("i", "glyphicon glyphicon-edit", playlist.id)
          .click (events.editPlaylist)
          .appendTo(imageContainer);
        // play button
          createElement("i", "glyphicon glyphicon-play", playlist.id)
          .click (events.playPlaylist)
          .appendTo(imageContainer);
        
        imageContainer.appendTo(maindiv);
        maindiv.appendTo(playlistsContainer);
        
        // circle the name
        new CircleType(nameDiv[0]).radius(120);
        nameDiv.fitText();

      }, 
  
      UpdatePlaylist: function (id, playlist) {
  
      },

      setEvents: function (params) {
        events.playPlaylist = params.playPlaylist; 
        events.editPlaylist = params.editPlaylist;
        events.deletePlaylist = params.deletePlaylist;
      }
  
    };
  
  }();
  
  var modalControl = function () {
  
    function viewModal() {
      $(".modal").modal("show");
    }
  
    return {
      addPlaylist : function () {
        
        viewModal();
      },
  
      editPlaylist : function (playlist) {
  
        viewModal();
      },
  
      editSongs : function (playlistId) {
  
        viewModal();
      },
  
      deletePlaylist : function (playlistId) {
  
        viewModal();
      },
  
    }

  }