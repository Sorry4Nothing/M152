(function ($) {
    //IN DEVELOPTMNET BORDER
    // $( "html" ).prepend( '<div style=" position: fixed; bottom: 0; left: 50%; width: 400px; z-index: 9999; background: rgba(143, 144, 143, 0.33); transform: translateX(-50%);"><h3 style=" text-align: center;color:#fff;">In Development</h3></div>' );

    //   FOR CSS GRID
    $( "html" ).prepend( '<style>.showGrid > *{-moz-box-shadow: 0 0 5px rgb(255, 0, 0);-webkit-box-shadow: 0 0 5px rgb(255, 0, 0);box-shadow: 0 0 5px rgb(255, 0, 0);} .showGrid {grid-gap: 10px!important;transition: all 0.25s ease-in-out;}</style>' );

    var characters = {};
    var pressedKeys = [];
    var active = "false";
    function toggleShowChar (character){
        $('body').toggleClass(characters[character].name+'-show');
    }
    $(document).ready(function() {
        characters = {
            'guessed' : [],
            'dev' : {
                'name'        : 'dev',
                'nameKeys'    : "68,69,86",
            }
        };
    });
    $(window).keydown(function(e){
        pressedKeys.push( e.keyCode );
        for(var character in characters){
            if ( pressedKeys.toString().indexOf( characters[character].nameKeys ) >= 0 ) {
                pressedKeys = [];
                if ($.inArray(character, characters.guessed) === -1) {
                    characters.guessed.push(character);
                }
                if(character=="dev" && active=="false"){
                    var style = $('<style class="outlines">*, *:before, *:after {-moz-box-shadow: 0 0 5px rgba(0,168,225,.5);-webkit-box-shadow: 0 0 5px rgba(0,168,225,.5);box-shadow: 0 0 5px rgba(0,168,225,.5);}</style>')
                    $('html > head').append(style);
                    $('*').each(function(){
                        if( $(this).css('display') == 'grid') {
                            $(this).addClass('showGrid');
                        }
                    });
                    active = "true";
                }
                else if(character=="dev" && active=="true"){
                    $( ".outlines" ).remove();
                    $('.showGrid').removeClass('showGrid');
                    active ="false"
                }
            }
        }
        if (pressedKeys.length > 500) { pressedKeys = []; }
    });
})(jQuery);


var scrolled;
var ScrollTop = 0;
var delta = 5;
var navHeight = $('header').outerHeight();
var open = false; //Used for bottom nav
$(window).scroll(function(event) {
    scrolled = !0
});
setInterval(function() {
    if (scrolled) {
        hasScrolled();
        scrolled = !1
    }
}, 250);
function hasScrolled() {
    var st = $(this).scrollTop();//ST = curent position of scroll   NAV DOWN IS DARK
    if (Math.abs(ScrollTop - st) <= delta)//if 0 - curent location is less than or =to 5 return
        return;
    paralax(st)
    ScrollTop = st;
}

function paralax(scroll){
    $(".para-image").each(function(){
        var paraSpeed = $(this).attr("paralax-speed");
        var speed =  (scroll * paraSpeed)/60;
        $(this).css("transform", "translate3d(0px, "+ speed +"px, 0px)");
    });
}