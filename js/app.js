$(document).foundation();

$(document).on('ready', function () {
    $('.button-go').on('click', function () {

        var pass = $("#password").val();
        var loginNumber = $('#login').html();

        var obj = {
            login:  loginNumber,
            password: pass
        };

        login(obj);
    });

    $('.avatar').on('click', function () {

        var bg = $(this).css('background-image');
        bg = bg.replace('url(','').replace(')','').replace(/\"/gi, "");
        alert(bg);
    });



    var login = function (obj) {
        $.ajax({
            type: "post",
            data: obj,
            url: "https://efigence-camp.herokuapp.com/api/login",
            error: function(response) {
                console.log(response.responseText);
            },
            success: function(response) {
                $('#response').html(JSON.stringify(response)).show();
                console.log(response);
            }
        });
    }
});
