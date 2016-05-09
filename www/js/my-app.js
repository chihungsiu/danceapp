// Initialize your app
var myApp = new Framework7({
    animateNavBackIcon: true
});

// Export selectors engine
var $$ = Dom7;

// Add main View
var mainView = myApp.addView('.view-main', {
    // Enable dynamic Navbar
    dynamicNavbar: true,
    // Enable Dom Cache so we can use all inline pages
    domCache: true
});

$(document).on('pageInit', function (e) {
    //init
    document.addEventListener("deviceready", onDeviceReady, false);
    function onDeviceReady() {
    }

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
                console.error(err);
                btn.prop("disabled", false);
            },
            success: function (response, textStatus, xhr) {
                console.log(response);
                btn.prop("disabled", false);
                var showText = 'data is sent\n\n' +
                    JSON.stringify(response.dataInDB, 0, 2);
                $('.post').find('textarea').val(showText)
            }
        });
    });
    $('.qrBtn').click(function(){
        //myApp.alert('test');
        console.log('clicked');
        cordova.plugins.barcodeScanner.scan(
            function (result) {
                alert("We got a barcode\n" +
                "Result: " + result.text + "\n" +
                "Format: " + result.format + "\n" +
                "Cancelled: " + result.cancelled);
            },
            function (error) {
                alert("Scanning failed: " + error);
            }
        );
    });
});
