<!DOCTYPE html>
<html>
<head>
    <title>Turkey Trot Cookie Clicker</title>
    <link href="http://fonts.googleapis.com/css?family=Kavoon&amp;subset=latin,latin-ext" rel="stylesheet"
          type="text/css">
    <link type="text/css" rel="stylesheet" href="bootstrap/css/bootstrap.min.css">
    <link type="text/css" rel="stylesheet" href="css/main.css">
    <script src="js/jquery-1.10.2.min.js"></script>
    <script src="bootstrap/js/bootstrap.min.js"></script>
    <script src="js/main.js"></script>
</head>
<body>
<div id="instructions">
insert instructions here
</div>
<div id="clicker">
    <div class="clicker-ribbon" id="clicker-score"><span id="clicker-score-num">0</span>
        <br/>
        cookies
        <div id="clicker-cps">per second: <span id="clicker-cps-num">0</span></div>
    </div>

    <a id="clicker-cookie" class="disabled" href="#"></a>
    <!--<div id="clicker-cookie-shadow"></div>-->

    <div class="clicker-ribbon container" id="clicker-timer">
        <div class="row">
            <div class="col-sm-8 col-sm-offset-2 col-lg-6 col-lg-offset-3">
                <div id="clicker-timer-start">
                    <button type="button" class="btn btn-success" id="startBtn">Start</button>
                </div>
                <div id="clicker-timer-counter">
                    <span id="counter"></span> ...
                </div>
                <div id="clicker-timer-progress">
                    <div class="progress progress-striped active">
                        <div id="timer" class="progress-bar" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"></div>
                    </div>
                    <div id="time-left">abc</div>
                </div>
            </div>
        </div>
    </div>
</div>

<nav class="navbar navbar-fixed-bottom navbar-inverse" role="navigation">
    <div class="container">
        <a class="navbar-brand" href="http://zacharyliu.com/cookieclicker/">Turkey Trot Cookie Clicker</a>

        <a href="#" class="btn btn-primary navbar-btn navbar-right disabled" id="loginBtn">Log In</a>
        <a href="#" class="btn btn-danger navbar-btn navbar-right disabled" id="logoutBtn">Log Out</a>
        <p class="navbar-text navbar-right" id="loginStatus">Checking login status...</p>
    </div>
</nav>

<iframe id="hiddenIframe"></iframe>

<!-- Google APIs Client Library -->
<script src="https://apis.google.com/js/client.js?onload=handleClientLoad"></script>

</body>
</html>