const pView = function () {
    let playlistsContainer = "#playlists";

    // events :
    function delPlaylistClick() {
        modals.deleteConfirmation($(this).data("id"));
    }

    function editPlaylistClick () {
        let id = $(this).data("id");
        modals.editPlaylist(data.playlistArr[id]);
    }

    function playPlaylistClick () {
        player.openPlayer($(this).data("id"));
    }

    function addPlaylist (playlist) {
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
          .click (delPlaylistClick)
          .appendTo(imageContainer);
        // edit button
          createElement("i", "glyphicon glyphicon-edit", playlist.id)
          .click (editPlaylistClick)
          .appendTo(imageContainer);
        // play button
          createElement("i", "glyphicon glyphicon-play", playlist.id)
          .click (playPlaylistClick)
          .appendTo(imageContainer);

        imageContainer.appendTo(maindiv);
        maindiv.appendTo(playlistsContainer);

        // circle the name
        circleText(nameDiv);
    }

    // helper functions: 
    function createElement (tag, classList, dataid) {
        return $(`<${tag}></${tag}>`)
            .addClass(classList)
            .attr("data-id", dataid);
    }

    function circleText (jqElement) {
        new CircleType(jqElement[0]).radius(120);
        jqElement.fitText();
    }

    function searchPlaylists() {
        let searchVal = $(this).val().toUpperCase();
        if (searchVal.length >= 2) {
            $("#playlists .playlist").each(function(){
                let id = $(this).data("id");
                if (data.playlistArr[id].name.toUpperCase().includes(searchVal)) {
                    $(this).show();
                } else {
                    $(this).hide();
                }
            });
        } else {
            $("#playlists .playlist").show();
        }
    }

    function init() {
        // add all playlists to view
        data.getAllPlaylists (playlists => {
            $.each(playlists, function() {
                addPlaylist(this);
                data.playlistArr[this.id] = this;
            });
        });

        // seach event
        $("input[name=search]").keyup (searchPlaylists);

        // add new playlist click event
        $(".addplaylist").click(() => {
            modals.addPlaylist();
        });
    }

    return {
        init : init, 
        addPlaylist: addPlaylist,
        updatePlaylist : (playlist) => {
            $(`#playlists .image-cropper[data-id=${playlist.id}] img`).attr("src", playlist.image);
            circleText($(`#playlists .name[data-id=${playlist.id}]`).text(playlist.name));
        }
    }
}();