// Initialize your app
var myApp = new Framework7({
    animateNavBackIcon: true,
    precompileTemplates: true,
    onPageInit: function (fw7) {
        indexInit(fw7);
        $(document).on('deviceready', function() {
            console.log("Device is ready!");
            $$(document).on('pageInit', function (e) {
                pageinit(fw7,e);
                // Do something here when page loaded and initialized
            })
        });
    }
});

de1 = function () {
    console.log(myApp);
};

// Export selectors engine
var $$ = Dom7;

// Add main View
mainView = myApp.addView('.view-main', {
//var mainView = myApp.addView('.view-main', {
    // Enable dynamic Navbar
    dynamicNavbar: true,
    // Enable Dom Cache so we can use all inline pages
    domCache: true
});

function indexInit(fw7){
    $('.center').click(function(){
        console.log('ok');});
}
function pageinit(fw7,e) {
    var page=e.detail.page.name;
    if(page==='whatever'){
        console.log('fine');
        var compiledTemplate = Template7.compile($$('#template').html());
        var context = {
            firstName: 'Alice',
            lastName: 'Doe'
        };
        var html = compiledTemplate(context);
        $('.temp1').html(html)
    }

    console.log('loaded');

    $(document).keypress(function(e){
        //console.log(e.which);
        if(e.which===32){
        //    use space as backbutton
        //    mainView.router.load();
            console.log('spacebar');
        }
        if(e.which===44){
            $('.icon-back').click();
            console.log('pressed <');
        }
        if(e.which===46){
            console.log('pressed >');
        }
        if(e.which===47){
            $('.icon-back').click();
            console.log('pressed /');
        }

    });
    $('.test2').click(function(){
        $('.icon-bars').click();
        //myApp.alert();
    });
    $(document).on('backbutton', function() {
        mainView.router.back();
        //$.mobile.changePage("#homepage", "slideup");
    });
    var liveDB = 'https://rocky-headland-65432.herokuapp.com/';
    $('.getdb').click(function (e) {
        var btn = $(e.target);
        btn.prop("disabled", true);
        $('.get').find('span').html('-');
        $('.get').find('textarea').val('trying to connect');

        $.ajax({
            type: "get",
            timeout: 10000,
            url: liveDB + 'db/get',
            error: function (err) {
                console.error(err);
                $('.get').find('textarea').val('error\n' + JSON.stringify(err, 0, 2));
                btn.prop("disabled", false);
            },
            success: function (response, textStatus, xhr) {
                console.log(response);
                var output = JSON.stringify(response, 0, 2);
                $('.get').find('span').html(response.length);
                $('.get').find('textarea').val(output);
                btn.prop("disabled", false);
            }
        });
    });
    $('.get').find('textarea').mouseover(function (e) {
        $(e.target).select();
    })
    $('.post').find('textarea').mouseover(function (e) {
        $(e.target).select();
    })
    $('.postdb').click(function (e) {
        var btn = $(e.target);
        btn.prop("disabled", true);
        var data = {text: $('.post').find('textarea').val()};
        $.ajax({
            type: "post",
            data: data,
            url: liveDB + 'db/post',
            timeout: 10000,
            error: function (err) {
                btn.prop("disabled", false);
                console.error(err);
            },
            success: function (response, textStatus, xhr) {
                btn.prop("disabled", false);
                console.log(response);
                var showText = 'data is sent\n\n' +
                    JSON.stringify(response.dataInDB, 0, 2);
                $('.post').find('textarea').val(showText)
            }
        });
    });
    $('.qrBtn').click(function (e) {
        var btn = $(e.target);
        btn.prop("disabled", true);
        cordova.plugins.barcodeScanner.scan(
            function (result) {
                btn.prop("disabled", false);
                alert("We got a barcode\n" +
                "Result: " + result.text + "\n" +
                "Format: " + result.format + "\n" +
                "Cancelled: " + result.cancelled);
                $(e.target).prop("disabled", false);
            },
            function (error) {
                btn.prop("disabled", false);
                alert("Scanning failed: " + error);
                $(e.target).prop("disabled", false);
            }
        );
    })
}
