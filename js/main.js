var clientId = '993284866388-pcm5tae9f30762mugjoltji2amkcab7s.apps.googleusercontent.com';
var apiKey = 'AIzaSyADQ1i4UcYBXDDRQolmegnJuWNKJHFe4ac';
var scopes = 'email profile';

(function() {
    // TODO: consolidate state variables
	var isRunning=false;
    var isClickable=false;
	var canstart=true;
    var score = 0;
    var scoreLastSecond = 0;

    var isLoggedIn = false;
    var name = '';
    var email = '';

    var animations = [];
	
    function scorePlusOne() {
        score += 1;
        scoreLastSecond += 1;
        scoreUpdate();
    }
    function scoreUpdate() {
        $('#clicker-score-num').text(score);
    }
    function scoreReset() {
        score = 0;
        scoreUpdate();
    }
    function cpsUpdate() {
        $('#clicker-cps-num').text(scoreLastSecond);
        scoreLastSecond = 0;
    }
    function init() {
        scoreUpdate();
        setInterval(function(){
            cpsUpdate()
        }, 1000);

        // click handlers
        $('#clicker-cookie').click(function(e){
            e.preventDefault();
			var fake=false;
			if (!e.which || typeof(e.originalEvent)==='undefined' || !(e.screenX>0) || !(e.screenY>0)) {
				fake = true;
			}	
			if (isClickable==true && fake==false) {
				scorePlusOne();
			}
        });
        $('#loginBtn').click(function() {
            doLogin();
            return false;
        });
        $('#logoutBtn').click(function() {
            doLogout();
            return false;
        });
        // TODO: clean up round animation sequence
		$('#startBtn').click(function() {
			if (isRunning==false && canstart==true) {
                isRunning=true;
                scoreReset();
                $("#clicker-score").removeClass('large');
                switchRibbonItem('#clicker-timer-counter');
				countdown(function() {
                    switchRibbonItem('#clicker-timer-progress');
                    $('#clicker-cookie').removeClass('disabled');
                    isClickable = true;
					animateMeter(30000, function() {
                        isClickable = false;
                        $('#startBtn').text('Play Again');
                        $('#clicker-score').addClass('large');
                        $('#clicker-cookie').addClass('disabled');
                        switchRibbonItem('#clicker-timer-start');
                        timerDone();
                    });
				});
			}
			return false;
		});
        switchRibbonItem('#clicker-timer-start');

        // hidden iframe onLoad handler
        $('#hiddenIframe').load(function() {
            checkAuth();
        });

        var resizeDelayedHandler;
        $(window).resize(function() {
            $('#loginBtn').popover('hide');
            clearTimeout(resizeDelayedHandler);
            resizeDelayedHandler = setTimeout(function() {
                $('#loginBtn').popover('show');
            }, 500);
        })
    }
    $(function() {
        init();
    });

	function switchRibbonItem(id) {
        var ids = "#clicker-timer-counter, #clicker-timer-start, #clicker-timer-progress";
        $(ids).not(id).css('display', 'none');
        $(id).css('display', 'block');
    }
	function animateMeter(time, callback) {
		var a;
		if (callback == null) {
		  callback = function() {};
		}
		return a = $({
		  value: time
		}).animate({
		  value: 0
		}, {
			duration: time,
			easing: 'linear',
			step: function() {
				var width = (1-this.value/time) * 100 + '%';
				$('#timer').css('width', width);

				var text = (this.value/1000).toFixed(1) + ' seconds remaining';
				$('#time-left').text(text);
			},
			complete: callback
		});
	}
	function countdown(callback) {
		if (callback == null) {
		  callback = function() {};
		}
		$({value: 3}).animate({value: 0}, {
			duration: 3000,
			easing: 'linear',
			step: function() {
				$('#counter').text(Math.ceil(this.value));
			},
			complete: callback
		});
	}
	function timerDone() {
		isRunning=false;
		console.log(score);
        doSubmit();
	}

    function handleClientLoad() {
        gapi.client.setApiKey(apiKey);
        window.setTimeout(checkAuth, 1);
    }
    window.handleClientLoad = handleClientLoad;

    function checkAuth() {
        gapi.auth.authorize({client_id: clientId, scope: scopes, immediate: true}, handleAuthResult);
    }

    function handleAuthResult(authResult) {
        if (authResult && !authResult.error) {
            // Auth successful
            console.log('Logged in');
            $('#loginBtn').addClass('disabled').popover('destroy');
            $('#logoutBtn').removeClass('disabled');
            $('#loginStatus').text('Logging in...');
            makeApiCall();
            return true;
        } else {
            // Auth not successful
            console.log('Not logged in');
            $('#logoutBtn').addClass('disabled');
            $('#loginBtn').removeClass('disabled').popover({
                title: 'Log In!',
                content: 'Log in with your Google account before you play to save your score in the high score table.',
                placement: 'top',
                trigger: 'manual',
                container: '.navbar .container'
            }).popover('show');
            $('#loginStatus').text('Not logged in. Log in now!');
            isLoggedIn = false;
            name = '';
            email = '';
            return false;
        }
    }

    function makeApiCall() {
        gapi.client.load('oauth2', 'v2', function() {
            var request = gapi.client.oauth2.userinfo.get();
            request.execute(function(resp) {
                name = resp['name'];
                email = resp['email'];
                isLoggedIn = true;
                $('#loginStatus').text('Logged in as ' + name);
            });
        });
    }

    function doLogin() {
        gapi.auth.authorize({client_id: clientId, scope: scopes, immediate: false}, handleAuthResult);
    }

    function doLogout() {
        $('#hiddenIframe').attr('src', 'https://accounts.google.com/Logout');
    }

    function doSubmit(callback) {
        $.post('submit.php', {name: name, email: email, score: score}, function(data) {
            if (typeof callback === 'function') {
                callback();
            }
        });
    }
})();
