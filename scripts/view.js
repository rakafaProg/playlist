
var viewControl = function () {
  
    let events = {};

    let playlistsContainer = "#playlists";

    function createElement (tag, classList, dataid) {
      return $(`<${tag}></${tag}>`)
              .addClass(classList)
              .attr("data-id", dataid);
    }

    function circleText(jqElement) {
      new CircleType(jqElement[0]).radius(120);
      jqElement.fitText();
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
        circleText(nameDiv);
        // new CircleType(nameDiv[0]).radius(120);
        // nameDiv.fitText();

      }, 
  
      updatePlaylist: function (id, name, image) {
        $(`.image-cropper[data-id=${id}] img`).attr("src", image);
        circleText($(`.name[data-id=${id}]`).text(name));
      },

      setEvents: function (params) {
        events.playPlaylist = params.playPlaylist; 
        events.editPlaylist = params.editPlaylist;
        events.deletePlaylist = params.deletePlaylist;
      }
  
    };
  
  }();
  