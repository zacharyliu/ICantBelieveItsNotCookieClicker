var clientId = '993284866388-pcm5tae9f30762mugjoltji2amkcab7s.apps.googleusercontent.com';
var apiKey = 'AIzaSyADQ1i4UcYBXDDRQolmegnJuWNKJHFe4ac';
var scopes = 'email profile';

(function() {
	var timeron=false;
	var canstart=true;
    var score = 0;
    var scoreLastSecond = 0;

    var isLoggedIn = false;
    var name = '';
    var email = '';
	
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
			if (timeron==true && fake==false) {
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
		$('#startBtn').click(function() {
			if (timeron==false && canstart==true) {
				$('#startBtn').hide();
				$('#counter').css('z-index',50);
				$('#timer').css('width', '100%');
				$('#time-left').text('30.00 seconds remaining');
				countdown(3300, function() {
					$('#counter').css('z-index','');
					timeron=true;
					animateMeter(30000, function(){timerDone()});
				});			
			}
			return false;
		});

        // hidden iframe onLoad handler
        $('#hiddenIframe').load(function() {
            checkAuth();
        })
    }
    $(function() {
        init();
    });
	
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
				var t=this.value/time*100;
				$('#timer').css('width', t+'%')
				t = Math.round(this.value/1000*100)/100;
				t=t+' seconds remaining';
				$('#time-left').text(t);
			},
			complete: callback
		});
	}
	function countdown(time, callback) {
		var a;
		if (callback == null) {
		  callback = function() {};
		}
		return a = $({
		  value: time
		}).animate({
		  value: 1000
		}, {
			duration: time-1000,
			easing: 'linear',
			step: function() {
				t=Math.round(this.value/1000);
				$('#counter').text(t);
			},
			complete: callback
		});
	}
	function timerDone() {
		timeron=false;
		canstart=true;
		$('#startBtn').show();
		$('#time-left').text('0 seconds remaining');
		console.log(score);
		$('#sec3').slideDown();
	}

    window.handleClientLoad = function () {
        gapi.client.setApiKey(apiKey);
        window.setTimeout(checkAuth, 1);
    };

    function checkAuth() {
        gapi.auth.authorize({client_id: clientId, scope: scopes, immediate: true}, handleAuthResult);
    }

    function handleAuthResult(authResult) {
        if (authResult && !authResult.error) {
            // Auth successful
            console.log('Logged in');
            $('#loginBtn').addClass('disabled');
            $('#logoutBtn').removeClass('disabled');
            $('#loginStatus').text('Logging in...');
            makeApiCall();
            return true;
        } else {
            // Auth not successful
            console.log('Not logged in');
            $('#logoutBtn').addClass('disabled');
            $('#loginBtn').removeClass('disabled');
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

    function submit(callback) {
        $.post('submit.php', {name: name, email: email, score: score}, function(data) {
            if (typeof callback === 'function') {
                callback();
            }
        });
    }
})();
