$(document).foundation();

$(document).on('ready', function () {

    /**
     * jQuery function for display pop-up message
     */
    (function ($) {
        $.fn.message = function (msg) {
            $(this)
                .finish()
                .html(msg)
                .fadeIn()
                .delay(3000)
                .fadeOut();
        };
    })(jQuery);


    /**
     * jQuery function for input validation
     */

    (function ($) {
        $.fn.valid = function () {
            var value = true;
            this.msg = "Password must be";

            if ($(this).val().length < 4) {
                this.msg += " at least 4 characters";
                value = false;
            }

            if ($(this).val().length > 10) {
                this.msg += " not more than 10 characters";
                value = false;
            }

            return value;
        };
    })(jQuery);


    /**
     *
     * Ajax request for login
     * @param {Object} credits:
     * {
     *  login: "",
     *  password: ""
     * }
     *
     */
    var login = function (credits) {
        $.ajax({
            type: "post",
            data: credits,
            url: "https://efigence-camp.herokuapp.com/api/login",
            beforeSend: function () {
                loader.fadeIn();
            },
            error: function (res) {
                var response = JSON.parse(res.responseText).message;

                messageNode.message(response)
            },
            success: function (res) {
                if (res.status == true) location.href = "../dashboard.html"
            },
            complete: function () {
                loader.fadeOut();
            }
        });
    };


    /**
     * Get login and password from form elements,
     * and pass them to login() as {Object}
     */
    var submitLogin = function () {

        var name = loginName.html();
        var pass = passwordInput.val();

        var credits = {
            login: name,
            password: pass
        };

        login(credits);
    };


    /**
     *  ! Events !
     */

    var loginName = $('#login'),
        passwordInput = $('#password'),
        goButton = $('.button-go'),
        messageNode = $('#message'),
        loader = $('#loader');


    passwordInput.on('keydown', function (e) {

        if (e.which == 13) {

            e.preventDefault();

            if (passwordInput.valid()) {
                submitLogin();
            } else {
                messageNode.message(passwordInput.msg)
            }
        }
    });


    goButton.on('click', function (e) {

        e.preventDefault();

        if (passwordInput.valid()) {
            submitLogin();
        } else {
            messageNode.message(passwordInput.msg)
        }
    });

    /**
     * Dashboard
     */

    var tileMenu = $('.tile.tile__menu'),
        buttonControl = $('.icon__control'),
        buttonSearch = $('.button__search'),
        buttonLogout = $('.button__logout'),
        inputSearch = $('.input__search'),

        on = '__active';



    tileMenu.on('click' , function () {
        for (var i = 0; i < tileMenu.length; i++) {
            tileMenu.removeClass(on);
        }

        $(this).addClass(on);
    });

    buttonSearch.on('click', function () {
        $(this).toggleClass(on);
        inputSearch.toggleClass(on);
    });

    buttonControl.on('click', function () {
        if ($(this).next().is('.' + on)) {
            $(this).next().removeClass(on);
        } else {
            buttonControl.next().removeClass(on);
            $(this).next().addClass(on);
        }
    });



    buttonLogout.on('click', function () {
       $(this)
           .addClass('__active')
           .next()
           .toggleClass('__active');
    });




});
