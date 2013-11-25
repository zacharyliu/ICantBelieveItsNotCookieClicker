(function() {
	var timeron=false;
	var canstart=true;
    var score = 0;
    var scoreLastSecond = 0;
	
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
			if (timeron==false && canstart==true && fake==false) {
				timeron=true;
				animateMeter(30000, function(){timerDone()});
			}
			if (timeron==true && fake==false) {
				scorePlusOne();
			}
        })
    }
    $(function() {
        init();
    })
	
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
	function timerDone() {
		timeron=false;
		canstart=false;
		$('#time-left').text('0 seconds remaining');
		console.log(score);
		$('#sec3').slideDown();
	}
})();

function signinCallback(authResult) {
    if (authResult['access_token']) {
        // Update the app to reflect a signed in user
        // Hide the sign-in button now that the user is authorized, for example:
//        document.getElementById('signinButton').setAttribute('style', 'display: none');
    } else if (authResult['error']) {
        // Update the app to reflect a signed out user
        // Possible error values:
        //   "user_signed_out" - User is signed-out
        //   "access_denied" - User denied access to your app
        //   "immediate_failed" - Could not automatically log in the user
        console.log('Sign-in state: ' + authResult['error']);
    }
}