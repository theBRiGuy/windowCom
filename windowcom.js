function log(msg){
	$("#log").append(msg + "<br/>");
}

function openWindow(url){
	window.open(url);
}

function signIn(){
	sessionStorage.setItem("signInTime", moment().valueOf());

	// window.si = setInterval(si, 500);

	$("#signIn").attr("disabled", "disabled");
	$("#signOut").removeAttr("disabled");
}

function timeToCompareTo() {
	return (sessionStorage.getItem("lastAlertTime") || sessionStorage.getItem("signInTime"));
}

function si() {
	console.log("si!");
	var diffInSec = moment().diff(moment(Number(timeToCompareTo())), "seconds");
	console.log("diffInSec is ", diffInSec);
	if ( diffInSec >= 10) {
		alert("10 or more seconds since sign in");
		sessionStorage.setItem("lastAlertTime", moment().valueOf());
	}
}

function signOut(){
	clearInterval(window.si);

	$("#signIn").removeAttr("disabled");
	$("#signOut").attr("disabled", "disabled");
}

$(document).ready(function(){

	$(document).on("visibilitychange", function(){
		if (!document.hidden) {
			si();
			log("document is visible!");
		}
	});

	$("#newWindow").on("click", function(){
		openWindow(window.location.href);
	});

	$("#signIn").on("click", signIn);

	$("#signOut").on("click", signOut);

});