var validation = function(form) {
    var mailRegex = /^([a-z0-9!#$%&\'*+\/=?^_`{|}~-]\.?)+(?!\.)@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+(?:[a-z]{2,15})+(?:\*[a-z]{1,8})?/i,
        $mail = form.find('#login'),
        $password = form.find('#password');

    var isMailValid = function() {
        var result = !!$mail.val().match(mailRegex);

        if (!result) {
            $mail.addClass('valid_error');
        } else {
            $mail.removeClass('valid_error');
        }

        return result;
    };

    var isPasswordValid = function() {
        var result = $password.val().length > 0;

        if (!result) {
            $password.addClass('valid_error');
        } else {
            $password.removeClass('valid_error');
        }

        return result;
    };

    var resultMail = isMailValid(),
        resultPass = isPasswordValid();

    return resultMail && resultPass;
};

var login_handler = function() {

    var _els = {};

    _els.form = $('#ox_form');
    _els.submitBtn = _els.form.find(':submit');
    _els.error = _els.form.find('.error');

    this.init = function() {
        _els.form.submit(formSubmitHandler);
        if($('#password').val() || $('#login').val()) {
            ox_connect();
        }
    };

    function formSubmitHandler() {
        ox_connect();

        return false
    }

    function post(path, params, method) {
        method = method || "post"; // Set method to post by default if not specified.

        var form = document.createElement("form");
        form.setAttribute("method", method);
        form.setAttribute("action", path);

        for (var key in params) {
            if (params.hasOwnProperty(key)) {
                var hiddenField = document.createElement("input");
                hiddenField.setAttribute("type", "hidden");
                hiddenField.setAttribute("name", key);
                hiddenField.setAttribute("value", params[key]);

                form.appendChild(hiddenField);
            }
        }

        document.body.appendChild(form);
        form.submit();
    }

    function ox_connect() {
        var now = new Date();
        var clientToken = CryptoJS.MD5(now.toTimeString()).toString();

        ajaxParams = {
            url: '/ox_check.php',
            type: 'post',
            data: {
                _pass: $('#password').val(),
                _user: $('#login').val(),
                _token: clientToken
            },

            dataType: 'json',
            success: oxFormSubmitSuccess,
            error: oxFormSubmitError
        };

        $.ajax(ajaxParams);
    }

    function oxFormSubmitSuccess(response) {
        if (!response.status) {
            if(response.message == 'Login failed. Incorrect email or password. Not allowed.') {
                _els.submitBtn.removeClass('loading');
                _els.error.html('<span>Login failed. Incorrect email or password. Not allowed.</span>');
            } else {
                rc_connect();
            }
        } else {
            window.location = response.data.url;
        }
    }

    function oxFormSubmitError() {
	    console.log('error');
        _els.submitBtn.removeClass('loading');
        rc_connect();
    }

    function rc_connect() {
        ajaxParams = {
            url: '/roundcube_check.php',
            type: 'post',
            data: {
                _pass: $('#password').val(),
                _user: $('#login').val(),
            },
            dataType: 'json',
            success: roundcubeFormSubmitSuccess,
            error: loginError()
        };

        if (validation(_els.form) && !_els.submitBtn.hasClass('loading')) {
            loading();
            $.ajax(ajaxParams);
        } else {
            loginError();

            return false;
        }
    }

    function roundcubeFormSubmitSuccess(response) {
        if (!response.status) {
            _els.submitBtn.removeClass('loading');
            _els.error.html('Login failed. Incorrect email or password.');
            loginError();

            return false;
        }

        post(Config.roundcubeServer + '?_task=login', {
            _user: $('#login').val(),
            _pass: $('#password').val(),
            _url: '',
            _action: 'login',
            _token: ''
        });
    }

    function loginError() {
        _els.submitBtn.removeClass('loading');
        _els.error.html('<span>Login failed. Incorrect email or password.</span>');
    }


    function loading() {
        _els.submitBtn.addClass('loading');
        _els.error.html('');
    }
};

var login = new login_handler();
login.init();

