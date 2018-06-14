// Load all scripts from files
$.when(
    $.getScript( "scripts/circletype.min.js" ),
    $.getScript( "scripts/data.js" ),
    $.getScript( "scripts/validations.js" ),
    $.getScript( "scripts/player.js" ),
    $.getScript( "scripts/playlist-view.js" ),
    $.getScript( "scripts/modal.js" ),
    $.Deferred(function( deferred ){
        $( deferred.resolve );
    })
).done(function(){
    // init all controllers
    $(document).ready(()=>{
        player.init();
        pView.init();
        modals.init();
    });
    
});