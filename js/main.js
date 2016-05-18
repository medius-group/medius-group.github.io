$( document ).ready(function() {
    $(window).scroll(function() {     
        var scroll = $(window).scrollTop();
        if (scroll > 0) {
            $(".site-header").addClass("is-scrolling");
        }
        else {
            $(".site-header").removeClass("is-scrolling");
        }
    });
});