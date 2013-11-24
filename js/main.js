(function() {
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
            scorePlusOne();
        })
    }
    $(function() {
        init();
    })
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