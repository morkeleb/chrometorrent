
function refresh_log() {
	var logdiv = document.getElementById("log");
	logdiv.innerHTML = "";
	var logdata = localStorage["logdata"];
	if( logdata !== undefined ){
		var log = JSON.parse( logdata );
		for( var label in log ){
			if( log.hasOwnProperty(label) ) {
				logdiv.innerHTML += "<p>"+log[label]+"</p>";
			}
		}
	}
}

function clear_log() {
	document.getElementById("log").innerHTML = "";
	localStorage["logdata"] = "";
}

// Saves options to localStorage.
function save_options() {
  var host = document.getElementById("host").value;
  var user = document.getElementById("user").value;
  var pass = document.getElementById("password").value;
  
  //ensure trailing slash
  if( host.charAt( host.length - 1 ) !== "/" )
	host = host + "/";

  localStorage["host"] = host;
  localStorage["user"] = user;
  localStorage["pass"] = pass;
  
  document.getElementById("status").innerHTML = "saved";
  
  restore_options();
}

// Restores select box state to saved value from localStorage.
function restore_options() {
  var host = localStorage["host"];
  var user = localStorage["user"];
  var pass = localStorage["pass"];
  
  document.getElementById("host").value = host;
  document.getElementById("user").value = user;
  document.getElementById("password").value = pass;
}

// fix for security restrictions in chrome manifest version 2
document.addEventListener('DOMContentLoaded', function () {
  document.getElementById('save_options').addEventListener('click', save_options);
  document.getElementById('refresh_log').addEventListener('click', refresh_log);
  document.getElementById('clear_log').addEventListener('click', clear_log);
  restore_options();
});