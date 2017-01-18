var app = {
    isMobile: null,
    init: function() {
        $("#map").css({
            "height": $(window).height(),
            "width": $(window).width()
        })
        app.checkMobile();
        //mapControls.controlSetup();
    },
    resize: function() {
        $(window).on('resize', function() {
            $("#map").css({
                "height": $(this).height(),
                "width": $(this).width()
            })
            app.checkMobile();
            //mapControls.controlSetup();
        })
    },
    checkMobile: function() {
        if ($(window).width() < 400) {
            this.isMobile = true;
        } else {
            this.isMobile = false;
        }
        console.log(this.isMobile);
    }
};
app.init();
app.resize();
