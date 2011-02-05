
function ChromeTorrent(host, username, password) {
	var self = this;

	var token = "tt";

	$.ajax({url:host + "token.html", success:function(data) {
	token = $(data).first().first().html();},
		username:username, password:password});

	$.get(host + "token.html", function(data){
	token = $(data).first().first().html();});
	
	this.getUser = function() {
					return username;
	};
	this.getHost= function() {
					return host;
	};
	this.getPassword= function() {
					return password;
	};
	this.getToken = function() {
					return token;
	};
	
	this.createDownloadUrlForTorrent =  function (url) {
	return self.getHost() + "?token=" + self.getToken() + "&action=add-url&s=" + escape(url);
}

	this.addTorrent = function(torrentUrl){
					$.ajax({url:self.createDownloadUrlForTorrent(torrentUrl),
									username:self.getUser(),
									password:self.getPassword()});
	};
};


var myTorrent = new ChromeTorrent(localStorage["host"], localStorage["user"], localStorage["pass"]);

function download(info, tab) {
  myTorrent.addTorrent(info.linkUrl);
  console.log("item " + info.linkUrl + " was clicked");
}

  var title = "Download with uTorrent";
  var id = chrome.contextMenus.create({"title": title, "contexts":["link"],
                                       "onclick": download});


