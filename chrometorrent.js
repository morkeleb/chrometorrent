function ChromeTorrent() {

// Fields
	var self = this;
	var host = "";
	var username = "";
	var password = "";
	var token = "";

// Private methods
	var resetToken = function( callback ) {
		$.ajax( {
			url:      host + "token.html",
			success:  function(data) { token = $(data).first().first().html(); if( callback !== undefined ) callback(); },
			username: username,
			password: password
		});
	};
	
	var hasStorageChanged = function() {
		return localStorage["host"] !== host || localStorage["user"] !== username || localStorage["pass"] !== password;
	};

	var refetchStorage = function() {
		host = localStorage["host"];
		username = localStorage["user"];
		password = localStorage["pass"];
	};
	
	var postTorrent = function(torrent) {
		$.ajax( {
			url:      self.createDownloadUrlForTorrent(torrent),
			username: self.getUser(),
			password: self.getPassword()
		});

	};

// Public methods
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
	};

	this.addTorrent = function(torrentUrl) {
		if( !hasStorageChanged() ) {
			// quick way
			postTorrent(torrentUrl);
		} else {
			//slow way, redo token thing
			refetchStorage();
			resetToken( function(){ postTorrent(torrentUrl) } );
		}
	};
}


var myTorrent = new ChromeTorrent();

function download(info, tab) {
  myTorrent.addTorrent(info.linkUrl);
  console.log("item " + info.linkUrl + " was clicked");
}

  var title = "Send to uTorrent";
  var id = chrome.contextMenus.create({"title": title, "contexts":["link"],
                                       "onclick": download});


